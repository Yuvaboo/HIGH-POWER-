/**
 * MURUGAN IMPEX — DENTAL PLATFORM & KNOWLEDGE HUB
 * app.js — E-Commerce Storefront Logic (Cart, Orders, Checkout)
 */

import { supabase, APP_CONFIG, STRIPE_CONFIG } from './supabase-config.js';
import {
  getCurrentUser, getCurrentProfile, requireAuth,
  showToast, formatCurrency, formatDate, calculateGST,
  generateOrderReference, generateInvoiceNumber, generateAWB,
  subscribeToUpdates
} from './auth.js';

// ─── CART STATE ────────────────────────────────────────────────────────────
const CART_KEY = 'mi_cart';

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) { existing.quantity += qty; } else { cart.push({ ...product, quantity: qty }); }
  saveCart(cart);
  showToast(product.title + ' added to cart.', 'success');
}

export function removeFromCart(productId) {
  saveCart(getCart().filter(item => item.id !== productId));
}

export function updateCartQuantity(productId, qty) {
  if (qty <= 0) { removeFromCart(productId); return; }
  saveCart(getCart().map(item => item.id === productId ? { ...item, quantity: qty } : item));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ─── CART UI ───────────────────────────────────────────────────────────────
export function renderCart(container, callbacks = {}) {
  if (!container) return;
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p style="color:#94a3b8;text-align:center;padding:40px">Your cart is empty.</p>';
    return;
  }
  const subtotal = getCartSubtotal();
  const gst = calculateGST(subtotal);

  let rows = '';
  cart.forEach(function(item) {
    rows += '<tr data-id="' + item.id + '" style="border-bottom:1px solid #1e293b">' +
      '<td style="padding:12px 0">' +
        '<div style="font-weight:600;color:#f1f5f9">' + item.title + '</div>' +
        (item.origin ? '<div style="font-size:12px;color:#64748b">Origin: ' + item.origin + '</div>' : '') +
        (item.hsn_code ? '<div style="font-size:12px;color:#64748b">HSN: ' + item.hsn_code + '</div>' : '') +
      '</td>' +
      '<td style="text-align:center;padding:10px">' +
        '<input type="number" min="1" max="999" value="' + item.quantity + '" data-product-id="' + item.id + '" class="cart-qty-input" style="width:60px;text-align:center;background:#1e293b;border:1px solid #334155;color:#f1f5f9;border-radius:6px;padding:4px 6px">' +
      '</td>' +
      '<td style="text-align:right;padding:10px;color:#94a3b8">' + formatCurrency(item.price) + '</td>' +
      '<td style="text-align:right;padding:10px;color:#f1f5f9;font-weight:600">' + formatCurrency(item.price * item.quantity) + '</td>' +
      '<td style="text-align:right;padding:10px"><button data-product-id="' + item.id + '" class="cart-remove-btn" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:16px">&#10005;</button></td>' +
    '</tr>';
  });

  container.innerHTML =
    '<table style="width:100%;border-collapse:collapse;font-size:14px">' +
      '<thead><tr style="border-bottom:1px solid #334155;color:#94a3b8">' +
        '<th style="text-align:left;padding:10px 0">Product</th>' +
        '<th style="text-align:center;padding:10px">Qty</th>' +
        '<th style="text-align:right;padding:10px">Price</th>' +
        '<th style="text-align:right;padding:10px">Total</th>' +
        '<th></th>' +
      '</tr></thead>' +
      '<tbody>' + rows + '</tbody>' +
      '<tfoot><tr><td colspan="5" style="padding:12px 0">' +
        '<div style="display:flex;justify-content:flex-end;flex-direction:column;align-items:flex-end;gap:4px;color:#94a3b8;font-size:14px">' +
          '<div>Subtotal: <strong style="color:#f1f5f9">' + formatCurrency(subtotal) + '</strong></div>' +
          '<div>CGST (9%): <strong style="color:#f1f5f9">' + formatCurrency(gst.cgst) + '</strong></div>' +
          '<div>SGST (9%): <strong style="color:#f1f5f9">' + formatCurrency(gst.sgst) + '</strong></div>' +
          '<div style="font-size:16px;margin-top:8px">Total (incl. GST): <strong style="color:#10b981;font-size:18px">' + formatCurrency(gst.total) + '</strong></div>' +
        '</div>' +
      '</td></tr></tfoot>' +
    '</table>';

  container.querySelectorAll('.cart-qty-input').forEach(function(input) {
    input.addEventListener('change', function() {
      updateCartQuantity(input.dataset.productId, parseInt(input.value) || 1);
      renderCart(container, callbacks);
      if (callbacks.onUpdate) callbacks.onUpdate();
    });
  });

  container.querySelectorAll('.cart-remove-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      removeFromCart(btn.dataset.productId);
      renderCart(container, callbacks);
      if (callbacks.onRemove) callbacks.onRemove();
    });
  });
}

// ─── ORDER PLACEMENT ───────────────────────────────────────────────────────
export async function placeOrder(shippingInfo) {
  const profile = await requireAuth();
  if (!profile) return { error: new Error('Not authenticated') };

  const cart = getCart();
  if (cart.length === 0) return { error: new Error('Cart is empty') };

  const subtotal       = getCartSubtotal();
  const gst            = calculateGST(subtotal);
  const orderReference = generateOrderReference();
  const invoiceNumber  = generateInvoiceNumber();
  const awbNumber      = generateAWB();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_reference:  orderReference,
      user_id:          profile.id,
      doctor_name:      shippingInfo.doctor_name  || profile.full_name,
      clinic_name:      shippingInfo.clinic_name  || profile.clinic_name,
      dci_number:       shippingInfo.dci_number   || profile.dci_number,
      gstin:            shippingInfo.gstin         || profile.gstin,
      shipping_address: shippingInfo.address,
      shipping_city:    shippingInfo.city,
      shipping_state:   shippingInfo.state,
      shipping_pincode: shippingInfo.pincode,
      awb_number:       awbNumber,
      subtotal:         subtotal,
      gst_amount:       gst.igst,
      total_amount:     gst.total,
      invoice_number:   invoiceNumber,
      status:           'processing'
    })
    .select('id')
    .single();

  if (orderError) { console.error('[app] Order insert failed:', orderError.message); return { error: orderError }; }

  const items = cart.map(function(item) {
    return {
      order_id:      order.id,
      product_id:    item.id,
      product_title: item.title,
      origin:        item.origin    || null,
      batch_lot:     item.batch_lot || null,
      hsn_code:      item.hsn_code  || null,
      unit_price:    item.price,
      quantity:      item.quantity,
      gst_rate:      18,
      total_price:   parseFloat((item.price * item.quantity).toFixed(2))
    };
  });

  const { error: itemsError } = await supabase.from('order_items').insert(items);
  if (itemsError) console.error('[app] Order items insert failed:', itemsError.message);

  clearCart();
  return { orderId: order.id, orderReference, invoiceNumber, awbNumber, error: null };
}

// ─── ORDER HISTORY ─────────────────────────────────────────────────────────
export async function getMyOrders(limit = 20) {
  const user = await getCurrentUser();
  if (!user) return { orders: [], error: new Error('Not authenticated') };
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(id, product_title, quantity, unit_price, total_price, hsn_code, origin)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);
  return { orders: data || [], error };
}

export async function renderOrderHistory(container) {
  if (!container) return;
  container.innerHTML = '<p style="color:#94a3b8;text-align:center;padding:20px">Loading orders...</p>';
  const { orders, error } = await getMyOrders();
  if (error) { container.innerHTML = '<p style="color:#ef4444;text-align:center">Could not load orders.</p>'; return; }
  if (orders.length === 0) { container.innerHTML = '<p style="color:#64748b;text-align:center;padding:40px">No orders yet. Start shopping!</p>'; return; }

  const statusColors = { processing: '#f59e0b', dispatched: '#3b82f6', in_transit: '#8b5cf6', delivered: '#10b981', cancelled: '#ef4444' };
  const statusLabels = { processing: 'Processing', dispatched: 'Dispatched', in_transit: 'In Transit', delivered: 'Delivered', cancelled: 'Cancelled' };

  let html = '';
  orders.forEach(function(order) {
    const sc = statusColors[order.status] || '#94a3b8';
    const sl = statusLabels[order.status] || order.status;
    let itemRows = '';
    (order.order_items || []).forEach(function(item) {
      itemRows += '<div style="display:flex;justify-content:space-between;font-size:13px;color:#94a3b8;margin-bottom:4px"><span>' + item.product_title + ' x' + item.quantity + '</span><span>' + formatCurrency(item.total_price) + '</span></div>';
    });
    html += '<div class="order-card" id="order-' + order.id + '" style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid #334155">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">' +
        '<div><div style="font-weight:700;font-size:16px;color:#f1f5f9">' + order.order_reference + '</div>' +
          '<div style="font-size:12px;color:#64748b;margin-top:2px">' + formatDate(order.created_at) + '</div>' +
          '<div style="font-size:12px;color:#64748b">Invoice: ' + order.invoice_number + '</div></div>' +
        '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">' +
          '<span class="order-status-badge" style="background:' + sc + '22;color:' + sc + ';border:1px solid ' + sc + '44;border-radius:20px;padding:3px 12px;font-size:12px;font-weight:600">' + sl + '</span>' +
          '<div style="font-size:18px;font-weight:700;color:#10b981">' + formatCurrency(order.total_amount) + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:14px;padding-top:14px;border-top:1px solid #334155"><div style="font-size:12px;color:#64748b;margin-bottom:8px">ITEMS</div>' + itemRows + '</div>' +
      '<div style="margin-top:14px;padding-top:14px;border-top:1px solid #334155;font-size:12px;color:#64748b">&#128666; AWB: <strong style="color:#94a3b8">' + order.awb_number + '</strong> &bull; ' + (order.courier || 'BlueDart Medical Express (Cold-Chain)') + '</div>' +
    '</div>';
  });

  container.innerHTML = html;

  const profile = await getCurrentProfile();
  if (profile) {
    subscribeToUpdates('orders', function(updatedOrder) {
      const card = document.getElementById('order-' + updatedOrder.id);
      if (card) {
        const badge = card.querySelector('.order-status-badge');
        if (badge) {
          const c = statusColors[updatedOrder.status] || '#94a3b8';
          badge.style.background = c + '22'; badge.style.color = c; badge.style.border = '1px solid ' + c + '44';
          badge.textContent = statusLabels[updatedOrder.status] || updatedOrder.status;
        }
      }
    }, { column: 'user_id', value: profile.id });
  }
}

// ─── SUBSCRIPTION CHECKOUT ─────────────────────────────────────────────────
export async function startSubscriptionCheckout(plan) {
  const profile = await requireAuth('/login.html');
  if (!profile) return;
  if (['premium','admin'].includes(profile.role)) { showToast('You already have an active premium subscription.', 'info'); return; }
  showToast('Redirecting to payment...', 'info');
  try {
    const { data, error } = await supabase.functions.invoke('verify-payment', {
      body: { action: 'create_checkout', plan, priceId: STRIPE_CONFIG.prices[plan], userId: profile.id, userEmail: profile.email, successUrl: window.location.origin + '/payment-success.html?session_id={CHECKOUT_SESSION_ID}', cancelUrl: window.location.origin + '/pricing.html' }
    });
    if (error || !data?.url) { console.error('[app] Checkout session error:', error); showToast('Could not start checkout. Please try again.', 'error'); return; }
    window.location.href = data.url;
  } catch (err) { console.error('[app] Checkout error:', err); showToast('Checkout failed: ' + err.message, 'error'); }
}

// ─── CONTENT ───────────────────────────────────────────────────────────────
export async function fetchArticles({ tier = 'free', category = null, limit = 20 } = {}) {
  let query = supabase.from('premium_content').select('id, title, slug, category, tier, read_time, content_type, rating, excerpt, thumbnail_url, author_name, created_at').eq('published', true).order('created_at', { ascending: false }).limit(limit);
  if (tier !== 'all') query = query.eq('tier', tier);
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  return { articles: data || [], error };
}

export async function fetchArticleBySlug(slug) {
  const { data, error } = await supabase.from('premium_content').select('*').eq('slug', slug).eq('published', true).single();
  return { article: data, error };
}

// ─── ADMIN ─────────────────────────────────────────────────────────────────
export async function adminGetAllProfiles() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  return { profiles: data || [], error };
}

export async function adminUpdateUserRole(userId, role) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  return { error };
}

export async function adminPublishArticle(article) {
  const { data, error } = await supabase.from('premium_content').insert({ ...article, published: true }).select('id').single();
  return { id: data?.id, error };
}

export async function adminGetAllOrders(limit = 100) {
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }).limit(limit);
  return { orders: data || [], error };
}

export async function adminUpdateOrderStatus(orderId, status) {
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
  return { error };
}

export async function adminGetPayments(limit = 100) {
  const { data, error } = await supabase.from('payments').select('*, profiles(full_name, email, clinic_name)').order('created_at', { ascending: false }).limit(limit);
  return { payments: data || [], error };
}

// ─── COMMENTS ─────────────────────────────────────────────────────────────
export async function postComment({ content_id, comment, rating = 5, author_role = 'Dental Surgeon' }) {
  const profile = await requireAuth();
  if (!profile) return { error: new Error('Not authenticated') };
  const { data, error } = await supabase.from('comments').insert({ content_id, user_id: profile.id, author_name: profile.full_name || profile.email, author_role, comment, rating }).select('*').single();
  return { comment: data, error };
}

export async function fetchComments(contentId) {
  const { data, error } = await supabase.from('comments').select('*').eq('content_id', contentId).order('created_at', { ascending: false });
  return { comments: data || [], error };
}

// ─── LIVE CHAT ─────────────────────────────────────────────────────────────
export async function sendChatMessage(message, recipientId = null) {
  const profile = await requireAuth();
  if (!profile) return { error: new Error('Not authenticated') };
  const { data, error } = await supabase.from('chat_messages').insert({ sender_id: profile.id, sender_name: profile.full_name || profile.email, sender_role: profile.role, recipient_id: recipientId, message, is_support: true }).select('*').single();
  return { message: data, error };
}

export async function fetchChatMessages(limit = 50) {
  const { data, error } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: true }).limit(limit);
  return { messages: data || [], error };
}

// ─── STORAGE ───────────────────────────────────────────────────────────────
export async function uploadClinicalFile(file, description = '') {
  const user = await getCurrentUser();
  if (!user) return { fileRecord: null, error: new Error('Not authenticated') };
  const ext = file.name.split('.').pop();
  const fileName = user.id + '/' + Date.now() + '.' + ext;
  const { error: uploadError } = await supabase.storage.from(APP_CONFIG.storageBuckets.clinicalFiles).upload(fileName, file, { upsert: false });
  if (uploadError) return { fileRecord: null, error: uploadError };
  const { data: { publicUrl } } = supabase.storage.from(APP_CONFIG.storageBuckets.clinicalFiles).getPublicUrl(fileName);
  const { data, error } = await supabase.from('files').insert({ user_id: user.id, bucket_id: APP_CONFIG.storageBuckets.clinicalFiles, file_path: fileName, file_name: file.name, file_size: file.size, mime_type: file.type, description, public_url: publicUrl }).select('*').single();
  return { fileRecord: data, error };
}

export async function getMyFiles() {
  const user = await getCurrentUser();
  if (!user) return { files: [], error: new Error('Not authenticated') };
  const { data, error } = await supabase.from('files').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  return { files: data || [], error };
}
