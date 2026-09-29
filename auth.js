/**
 * MURUGAN IMPEX — DENTAL PLATFORM & KNOWLEDGE HUB
 * auth.js — Shared Supabase Auth, DB, Realtime & Storage Module
 */

import { supabase, APP_CONFIG, isSupabaseConfigured } from './supabase-config.js';
export { supabase };

let _currentUser = null;
let _currentProfile = null;

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  _currentUser = session?.user ?? null;
  return _currentUser;
}

export async function getCurrentProfile(forceRefresh = false) {
  if (_currentProfile && !forceRefresh) return _currentProfile;
  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) { console.error('[auth] Profile load failed:', error.message); return null; }
  _currentProfile = data;
  return _currentProfile;
}

export async function signUpWithEmail(email, password, meta = {}) {
  if (!isSupabaseConfigured()) return { user: null, error: new Error('Supabase not configured.') };
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(), password,
    options: { data: { full_name: meta.full_name||'', phone: meta.phone||'', clinic_name: meta.clinic_name||'', dci_number: meta.dci_number||'', gstin: meta.gstin||'' } }
  });
  if (error) return { user: null, error };
  if (data.user && (meta.address || meta.city)) {
    await supabase.from('profiles').update({ address: meta.address||'', city: meta.city||'', state: meta.state||'', pincode: meta.pincode||'' }).eq('id', data.user.id);
  }
  return { user: data.user, error: null };
}

export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured()) return { user: null, profile: null, error: new Error('Supabase not configured.') };
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error) return { user: null, profile: null, error };
  _currentUser = data.user; _currentProfile = null;
  const profile = await getCurrentProfile();
  return { user: data.user, profile, error: null };
}

export async function signInWithGoogle() {
  if (!isSupabaseConfigured()) { showToast('Supabase not configured.', 'error'); return; }
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard.html', queryParams: { access_type: 'offline', prompt: 'consent' } } });
  if (error) { console.error('[auth] Google OAuth:', error.message); showToast('Google sign-in failed.', 'error'); }
}

export async function signOut() {
  await supabase.auth.signOut();
  _currentUser = null; _currentProfile = null;
  window.location.href = '/login.html';
}

export async function requireAuth(redirectPath = '/login.html') {
  const user = await getCurrentUser();
  if (!user) { window.location.href = redirectPath; return null; }
  return getCurrentProfile();
}

export async function requirePremium(redirectPath = '/pricing.html') {
  const profile = await requireAuth();
  if (!profile) return null;
  if (['premium','admin'].includes(profile.role)) return profile;
  const { data: sub } = await supabase.from('subscriptions').select('id').eq('user_id', profile.id).eq('status','active').gt('current_period_end', new Date().toISOString()).maybeSingle();
  if (!sub) { showToast('Premium subscription required.', 'warning'); window.location.href = redirectPath; return null; }
  return profile;
}

export async function requireAdminAccess(redirectPath = '/index.html') {
  const profile = await requireAuth();
  if (!profile) return null;
  if (profile.role !== 'admin') { showToast('Administrator access required.', 'error'); window.location.href = redirectPath; return null; }
  return profile;
}

export async function updateProfile(fields) {
  const user = await getCurrentUser();
  if (!user) return { error: new Error('Not authenticated') };
  const { error } = await supabase.from('profiles').update(fields).eq('id', user.id);
  if (!error) _currentProfile = null;
  return { error };
}

export async function uploadAvatar(file) {
  const user = await getCurrentUser();
  if (!user) return { publicUrl: null, error: new Error('Not authenticated') };
  const ext = file.name.split('.').pop();
  const filePath = user.id + '/avatar.' + ext;
  const { error: uploadError } = await supabase.storage.from(APP_CONFIG.storageBuckets.avatars).upload(filePath, file, { upsert: true });
  if (uploadError) return { publicUrl: null, error: uploadError };
  const publicUrl = getPublicUrl(APP_CONFIG.storageBuckets.avatars, filePath);
  await updateProfile({ avatar_url: publicUrl });
  return { publicUrl, error: null };
}

export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl ?? '';
}

export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    _currentUser = session?.user ?? null; _currentProfile = null;
    if (typeof callback === 'function') callback(event, session);
  });
  return () => subscription.unsubscribe();
}

export function subscribeToTable(table, onInsert, filter = null) {
  const channel = supabase.channel('realtime:' + table + ':' + Date.now()).on('postgres_changes', { event: 'INSERT', schema: 'public', table, ...(filter ? { filter: filter.column + '=eq.' + filter.value } : {}) }, (payload) => onInsert(payload.new));
  channel.subscribe();
  return channel;
}

export function subscribeToUpdates(table, onUpdate, filter = null) {
  const channel = supabase.channel('realtime:updates:' + table + ':' + Date.now()).on('postgres_changes', { event: 'UPDATE', schema: 'public', table, ...(filter ? { filter: filter.column + '=eq.' + filter.value } : {}) }, (payload) => onUpdate(payload.new));
  channel.subscribe();
  return channel;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, { position: 'fixed', top: '20px', right: '20px', zIndex: '99999', display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' });
    document.body.appendChild(container);
  }
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
  const icons  = { success: '&#10003;', error: '&#10005;', warning: '&#9888;', info: 'ℹ' };
  const color  = colors[type] ?? colors.info;
  const icon   = icons[type]  ?? icons.info;
  const toast  = document.createElement('div');
  Object.assign(toast.style, { background: '#1e293b', color: '#f1f5f9', borderLeft: '4px solid ' + color, borderRadius: '8px', padding: '12px 16px', fontSize: '14px', fontFamily: "'Inter', system-ui, sans-serif", maxWidth: '360px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', pointerEvents: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', animation: 'toastSlideIn 0.3s ease', transition: 'opacity 0.3s' });
  toast.innerHTML = '<span style="color:' + color + ';font-weight:bold;font-size:16px">' + icon + '</span><span>' + message + '</span>';
  if (!document.getElementById('toast-keyframes')) {
    const s = document.createElement('style'); s.id = 'toast-keyframes';
    s.textContent = '@keyframes toastSlideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
    document.head.appendChild(s);
  }
  const dismiss = () => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); };
  toast.addEventListener('click', dismiss);
  container.appendChild(toast);
  if (duration > 0) setTimeout(dismiss, duration);
}

export function generateOrderReference() {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
  return 'MI-' + date + '-' + Math.floor(10000 + Math.random() * 90000);
}

export function generateInvoiceNumber() {
  const now = new Date();
  const fy  = now.getMonth() >= 3 ? now.getFullYear() + '-' + String(now.getFullYear()+1).slice(-2) : (now.getFullYear()-1) + '-' + String(now.getFullYear()).slice(-2);
  return 'INV/' + fy + '/' + Math.floor(10000 + Math.random() * 90000);
}

export function calculateGST(subtotal) {
  const gst  = parseFloat((subtotal * 0.18).toFixed(2));
  const half = parseFloat((gst / 2).toFixed(2));
  return { cgst: half, sgst: half, igst: gst, total: parseFloat((subtotal + gst).toFixed(2)) };
}

export function generateAWB() {
  return 'BD' + Math.floor(100000000 + Math.random() * 900000000);
}
