/**
 * MURUGAN IMPEX — KNOWLEDGE HUB
 * Firebase + Stripe Configuration
 *
 * ⚠️  SETUP REQUIRED: Replace all placeholder values below
 *     with your own Firebase project credentials and Stripe test keys.
 *
 * HOW TO GET FIREBASE KEYS:
 *  1. Go to https://console.firebase.google.com/
 *  2. Create a project → Add Web App → Copy config object
 *
 * HOW TO GET STRIPE TEST KEYS:
 *  1. Go to https://dashboard.stripe.com/test/apikeys
 *  2. Copy "Publishable key" (starts with pk_test_...)
 *
 * ⚠️  NEVER put your Stripe SECRET key here (that goes on a server only).
 */

// ─── FIREBASE CONFIG ────────────────────────────────────────────────────────
// Replace with your own Firebase project config
export const FIREBASE_CONFIG = {
  apiKey:            "YOUR_FIREBASE_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ─── STRIPE CONFIG (TEST MODE) ───────────────────────────────────────────────
// Replace with your Stripe Publishable KEY (pk_test_...)
export const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY";

// Stripe Checkout Price IDs (create these in Stripe Dashboard → Products)
// Go to: https://dashboard.stripe.com/test/products → Create Product → Add Price
export const STRIPE_PRICES = {
  monthly: "price_YOUR_MONTHLY_PRICE_ID",   // ₹1,499 / month
  annual:  "price_YOUR_ANNUAL_PRICE_ID"     // ₹12,999 / year
};

// ─── APP SETTINGS ────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  name:          "Murugan Impex Knowledge Hub",
  tagline:       "Premium Dental Education & Clinical Guides",
  currency:      "INR",
  symbol:        "₹",
  monthlyPrice:  1499,
  annualPrice:   12999,
  annualSaving:  "Save ₹5,989/year",
  supportEmail:  "support@muruganimpex.in",
  whatsapp:      "+918008008008",

  // Firestore collection names
  collections: {
    users:         "users",
    subscriptions: "subscriptions",
    content:       "content",
    categories:    "categories"
  },

  // Admin email addresses (add yours here)
  adminEmails: [
    "admin@muruganimpex.in"
  ],

  // Success / cancel URLs for Stripe Checkout
  // Change to your actual domain when going live
  stripeSuccessUrl: window.location.origin + "/payment-success.html?session_id={CHECKOUT_SESSION_ID}",
  stripeCancelUrl:  window.location.origin + "/pricing.html?payment=cancelled"
};
