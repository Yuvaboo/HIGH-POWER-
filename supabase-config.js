/**
 * MURUGAN IMPEX — KNOWLEDGE HUB & CLINICAL PLATFORM
 * Supabase + Stripe Configuration
 *
 * Replaces Firebase completely.
 * Loads environment variables from window.ENV, localStorage overrides, or config defaults.
 * Service-role keys and payment secrets are strictly kept server-side in Supabase Edge Functions.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

// Environment variable retrieval (supports build-time injection, runtime window.ENV, or localStorage)
function getEnvVar(key, fallback = '') {
  if (typeof window !== 'undefined') {
    if (window.ENV && window.ENV[key]) return window.ENV[key];
    const stored = localStorage.getItem(`ENV_${key}`);
    if (stored) return stored;
  }
  return fallback;
}

// ─── SUPABASE CREDENTIALS ──────────────────────────────────────────────────
// Override via: localStorage.setItem('ENV_SUPABASE_URL', '...')
// or window.ENV = { SUPABASE_URL: '...', SUPABASE_ANON_KEY: '...' }
export const SUPABASE_CONFIG = {
  url: getEnvVar('SUPABASE_URL', 'https://zvlqhrsiojkptpnewqfm.supabase.co'),
  anonKey: getEnvVar('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bHFocnNpb2prcHRwbmV3cWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1ODk3MzMsImV4cCI6MjEwNjE2NTczM30.S47bPUWNxRNAw8RsIoSFW5h2ft2hYvGyVl1GK4OsUP0')
};

export function isSupabaseConfigured() {
  return SUPABASE_CONFIG.url &&
    !SUPABASE_CONFIG.url.includes('placeholder') &&
    SUPABASE_CONFIG.anonKey &&
    !SUPABASE_CONFIG.anonKey.includes('placeholder');
}

// ─── CLIENT INITIALIZATION ─────────────────────────────────────────────────
export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper to dynamically set Supabase project credentials in the browser
export function configureSupabaseCredentials(url, anonKey) {
  if (!url || !anonKey) return false;
  localStorage.setItem('ENV_SUPABASE_URL', url.trim());
  localStorage.setItem('ENV_SUPABASE_ANON_KEY', anonKey.trim());
  window.location.reload();
  return true;
}

// Expose on window for convenience
if (typeof window !== 'undefined') {
  window.configureSupabaseCredentials = configureSupabaseCredentials;
}

// ─── STRIPE & PAYMENT CONFIG ───────────────────────────────────────────────
export const STRIPE_CONFIG = {
  publishableKey: getEnvVar('STRIPE_PUBLISHABLE_KEY', 'pk_test_51PLACEHOLDER_KEY'),
  prices: {
    monthly: 'price_monthly_1499',
    annual: 'price_annual_12999'
  }
};

// ─── APPLICATION SETTINGS ──────────────────────────────────────────────────
export const APP_CONFIG = {
  name: 'Murugan Impex Knowledge Hub',
  tagline: 'Premium Dental Education & Clinical Guides',
  currency: 'INR',
  symbol: '₹',
  monthlyPrice: 1499,
  annualPrice: 12999,
  annualSaving: 'Save ₹5,989/year',
  supportEmail: 'support@muruganimpex.in',
  whatsapp: '+918008008008',
  adminEmails: ['admin@muruganimpex.in', 'yuvas@muruganimpex.in'],

  // Supabase Storage Buckets
  storageBuckets: {
    clinicalFiles: 'clinical-files',
    contentMedia: 'content-media',
    avatars: 'avatars',
    invoices: 'invoices'
  },

  // Tables
  tables: {
    profiles: 'profiles',
    subscriptions: 'subscriptions',
    payments: 'payments',
    premiumContent: 'premium_content',
    orders: 'orders',
    orderItems: 'order_items',
    comments: 'comments',
    chatMessages: 'chat_messages',
    files: 'files'
  }
};
