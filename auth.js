/**
 * MURUGAN IMPEX — KNOWLEDGE HUB
 * Shared Auth Module (Firebase Authentication + Firestore)
 * All premium access control originates from server-side Firestore rules.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { 
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ─── EMBEDDED CONFIG (replace with your own) ─────────────────────────────────
// In production, load this from firebase-config.js using import
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_FIREBASE_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const ADMIN_EMAILS = ["admin@muruganimpex.in"];

// ─── INIT FIREBASE ───────────────────────────────────────────────────────────
let _app, _auth, _db;

function getFirebaseApp() {
  if (!_app) _app = initializeApp(FIREBASE_CONFIG);
  return _app;
}

export function getFirebaseAuth() {
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export function getFirestoreDB() {
  if (!_db) _db = getFirestore(getFirebaseApp());
  return _db;
}

// ─── AUTH FUNCTIONS ──────────────────────────────────────────────────────────

/** Create new account + user profile in Firestore */
export async function registerUser({ email, password, name, phone }) {
  const auth = getFirebaseAuth();
  const db   = getFirestoreDB();

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });

  // Create user profile document in Firestore
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid:         cred.user.uid,
    name,
    email,
    phone:       phone || '',
    role:        'free',               // 'free' | 'premium' | 'admin'
    memberSince: serverTimestamp(),
    lastLogin:   serverTimestamp(),
    subscriptionStatus: 'inactive',    // 'inactive' | 'active' | 'cancelled' | 'expired'
    subscriptionPlan:   null,          // null | 'monthly' | 'annual'
    subscriptionEndDate: null,
    stripeCustomerId:   null,
    stripeSessionId:    null,
  });

  return cred.user;
}

/** Sign in existing user + update lastLogin */
export async function loginUser({ email, password }) {
  const auth = getFirebaseAuth();
  const db   = getFirestoreDB();

  const cred = await signInWithEmailAndPassword(auth, email, password);

  // Update last login timestamp
  await updateDoc(doc(db, 'users', cred.user.uid), {
    lastLogin: serverTimestamp()
  }).catch(() => {}); // fail silently if doc doesn't exist yet

  return cred.user;
}

/** Google Sign-In */
export async function loginWithGoogle() {
  const auth     = getFirebaseAuth();
  const db       = getFirestoreDB();
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const user   = result.user;

  // Create user doc if first time
  const userRef  = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid:         user.uid,
      name:        user.displayName || '',
      email:       user.email,
      phone:       '',
      role:        'free',
      memberSince: serverTimestamp(),
      lastLogin:   serverTimestamp(),
      subscriptionStatus: 'inactive',
      subscriptionPlan:   null,
      subscriptionEndDate: null,
      stripeCustomerId:   null,
      stripeSessionId:    null,
    });
  } else {
    await updateDoc(userRef, { lastLogin: serverTimestamp() });
  }

  return user;
}

/** Sign out current user */
export async function logoutUser() {
  const auth = getFirebaseAuth();
  await signOut(auth);
  window.location.href = '/knowledge.html';
}

/** Send password reset email */
export async function resetPassword(email) {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, email);
}

// ─── USER PROFILE ────────────────────────────────────────────────────────────

/** Get full user profile from Firestore */
export async function getUserProfile(uid) {
  const db   = getFirestoreDB();
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

/** Update user profile fields */
export async function updateUserProfile(uid, fields) {
  const db = getFirestoreDB();
  await updateDoc(doc(db, 'users', uid), fields);
}

// ─── PREMIUM ACCESS CHECK ─────────────────────────────────────────────────────
// This check uses Firestore — the actual data is protected by Firestore Security Rules
// so a clever user cannot bypass it by editing localStorage or JS.

/**
 * Returns true if the user currently has an active premium subscription.
 * Checks Firestore (server-authoritative) not just localStorage.
 */
export async function isPremiumUser(uid) {
  if (!uid) return false;
  const profile = await getUserProfile(uid);
  if (!profile) return false;

  if (profile.role === 'admin') return true;  // admins always have access

  if (profile.subscriptionStatus !== 'active') return false;

  // Check if subscription has not expired
  if (profile.subscriptionEndDate) {
    const now = Date.now();
    const end = profile.subscriptionEndDate.toDate
      ? profile.subscriptionEndDate.toDate().getTime()
      : new Date(profile.subscriptionEndDate).getTime();
    if (now > end) return false;
  }

  return true;
}

/** Returns true if the user is an admin */
export async function isAdminUser(uid) {
  if (!uid) return false;
  const profile = await getUserProfile(uid);
  return profile?.role === 'admin' || ADMIN_EMAILS.includes(profile?.email);
}

// ─── SUBSCRIPTION UPDATE (called by webhook handler or Stripe success page) ──

/**
 * Update subscription status in Firestore after successful Stripe payment.
 * In production: this is called by a Firebase Cloud Function webhook, NOT client-side.
 * For local demo/testing: can be called from payment-success.html after verifying session.
 */
export async function activateSubscription(uid, { plan, sessionId, customerId, endDate }) {
  const db = getFirestoreDB();
  await updateDoc(doc(db, 'users', uid), {
    role:                'premium',
    subscriptionStatus:  'active',
    subscriptionPlan:    plan,
    subscriptionEndDate: endDate,
    stripeCustomerId:    customerId || null,
    stripeSessionId:     sessionId || null,
    activatedAt:         serverTimestamp()
  });
}

// ─── AUTH STATE LISTENER ─────────────────────────────────────────────────────

/**
 * Listen to Firebase auth state and call back with user + profile.
 * Use this on every page to set up UI based on login state.
 */
export function onAuthReady(callback) {
  const auth = getFirebaseAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      callback(user, profile);
    } else {
      callback(null, null);
    }
  });
}

/**
 * Gate a page: if user not logged in → redirect to login.
 * If logged in but not premium → redirect to pricing.
 * Only call this on premium pages.
 */
export function requirePremiumAccess() {
  const auth = getFirebaseAuth();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Not logged in
      window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return;
    }

    const premium = await isPremiumUser(user.uid);
    if (!premium) {
      // Logged in but not premium
      window.location.href = '/pricing.html?access=denied';
      return;
    }
    // User is premium — page can render content
    document.body.classList.add('premium-access-granted');
  });
}

/**
 * Gate a page: admin only. Redirects non-admins away.
 */
export function requireAdminAccess() {
  const auth = getFirebaseAuth();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = '/login.html?redirect=/admin.html';
      return;
    }
    const admin = await isAdminUser(user.uid);
    if (!admin) {
      window.location.href = '/knowledge.html';
      return;
    }
    document.body.classList.add('admin-access-granted');
  });
}

// ─── CONTENT FETCH (with access control) ─────────────────────────────────────

/** 
 * Fetch all free content articles from Firestore.
 * Firestore rules ensure premium content is not returned unless user is premium.
 */
export async function getFreeContent() {
  const db = getFirestoreDB();
  const q  = query(collection(db, 'content'), where('tier', '==', 'free'), where('published', '==', true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch all content for premium users */
export async function getPremiumContent() {
  const db = getFirestoreDB();
  const q  = query(collection(db, 'content'), where('published', '==', true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Get a single article by ID */
export async function getArticle(id) {
  const db   = getFirestoreDB();
  const snap = await getDoc(doc(db, 'content', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
