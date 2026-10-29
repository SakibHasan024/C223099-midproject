// cart.js - shopping cart stuff

let cart = JSON.parse(localStorage.getItem('sakibsmart_cart') || '[]');
let balance = parseInt(localStorage.getItem('sakibsmart_balance') || '1000');
let coupon = null;

const DELIVERY = 60;
const SHIPPING = 40;
var coupons = {
  SMART10: 0.10,
  SAVE20: 0.20,
  FIRST15: 0.15,
};

function openCart() {
  document.getElementById('cart-sidebar').style.transform = 'translateX(0)';
  document.getElementById('cart-overlay').classList.remove('hidden');
  renderCart();
}

function closeCart() {
  document.getElementById('cart-sidebar').style.transform = 'translateX(100%)';
  document.getElementById('cart-overlay').classList.add('hidden');
}

function addToCart(productId) {
  let product = getProductById(productId);
  if (!product) return;

  let found = cart.find(item => item.id === productId);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartCount();
  showToast(`${product.title.slice(0, 30)}… added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function changeQty(productId, delta) {
  let item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function renderCart() {
  let box = document.getElementById('cart-items');
  let empty = document.getElementById('cart-empty');
  let summary = document.getElementById('cart-summary');

  box.innerHTML = '';

  if (cart.length === 0) {
    empty.classList.remove('hidden');
    summary.classList.add('hidden');
    box.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  summary.classList.remove('hidden');
  box.classList.remove('hidden');

  cart.forEach(item => {
    let product = getProductById(item.id);
    if (!product) return;

    let el = document.createElement('div');
    el.className = 'flex gap-3 items-start bg-gray-50 dark:bg-card rounded-xl p-3 border border-gray-200 dark:border-muted';
    el.innerHTML = `
      <div class="w-16 h-16 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm leading-snug mb-1 truncate">${product.title}</p>
        <p class="text-primary font-heading font-semibold text-sm">৳${product.price}</p>
        <div class="flex items-center gap-2 mt-2">
          <button class="w-7 h-7 flex items-center justify-center rounded-full bg-muted text-white cursor-pointer text-base hover:bg-primary transition-colors flex-shrink-0" onclick="changeQty(${product.id}, -1)">−</button>
          <span class="text-sm font-heading font-semibold w-6 text-center">${item.qty}</span>
          <button class="w-7 h-7 flex items-center justify-center rounded-full bg-muted text-white cursor-pointer text-base hover:bg-primary transition-colors flex-shrink-0" onclick="changeQty(${product.id}, 1)">+</button>
        </div>
      </div>
      <button onclick="removeFromCart(${product.id})" class="text-gray-600 hover:text-primary transition-colors text-lg flex-shrink-0 mt-0.5" aria-label="Remove">×</button>
    `;
    box.appendChild(el);
  });

  updateCartTotals();
}

function getSubtotal() {
  return cart.reduce((sum, item) => {
    let product = getProductById(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function updateCartTotals() {
  let subtotal = getSubtotal();
  let delivery = cart.length > 0 ? DELIVERY : 0;
  let shipping = cart.length > 0 ? SHIPPING : 0;
  let rate = coupon ? coupons[coupon] : 0;
  let discount = Math.round(subtotal * rate);
  let total = subtotal + delivery + shipping - discount;

  document.getElementById('cart-subtotal').textContent = `৳${subtotal}`;
  document.getElementById('cart-delivery').textContent = `৳${delivery}`;
  document.getElementById('cart-shipping').textContent = `৳${shipping}`;
  document.getElementById('cart-total').textContent = `৳${total}`;

  let discRow = document.getElementById('discount-row');
  if (discount > 0) {
    discRow.classList.remove('hidden');
    document.getElementById('cart-discount').textContent = `-৳${discount}`;
  } else {
    discRow.classList.add('hidden');
  }

  let warning = document.getElementById('balance-warning');
  let checkoutBtn = document.getElementById('checkout-btn');
  if (total > balance && cart.length > 0) {
    warning.classList.remove('hidden');
    checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    checkoutBtn.disabled = true;
  } else {
    warning.classList.add('hidden');
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    checkoutBtn.disabled = false;
  }
}

function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.getElementById('cart-count');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function applyCoupon() {
  let input = document.getElementById('coupon-input').value.trim().toUpperCase();
  let msg = document.getElementById('coupon-msg');
  msg.classList.remove('hidden');

  if (coupons[input]) {
    coupon = input;
    msg.textContent = `✓ Coupon applied! ${coupons[input] * 100}% off.`;
    msg.className = 'text-xs mb-4 text-green-400';
    updateCartTotals();
  } else {
    coupon = null;
    msg.textContent = '✗ Invalid coupon code.';
    msg.className = 'text-xs mb-4 text-primary';
    updateCartTotals();
  }
}

function checkout() {
  let subtotal = getSubtotal();
  let delivery = DELIVERY;
  let shipping = SHIPPING;
  let rate = coupon ? coupons[coupon] : 0;
  let discount = Math.round(subtotal * rate);
  let total = subtotal + delivery + shipping - discount;

  if (total > balance) {
    showToast('Insufficient balance!');
    return;
  }

  balance -= total;
  cart = [];
  coupon = null;

  saveCart();
  saveBalance();
  updateCartCount();
  updateBalanceDisplay();
  renderCart();
  closeCart();

  showToast('Order placed successfully! 🎉');
}

function updateBalanceDisplay() {
  document.getElementById('balance-display').textContent = balance;
  let mob = document.getElementById('balance-mobile');
  if (mob) mob.textContent = balance;
  let modal = document.getElementById('modal-balance');
  if (modal) modal.textContent = `৳${balance}`;
}

function openAddMoney() {
  document.getElementById('modal-balance').textContent = `৳${balance}`;
  document.getElementById('add-money-overlay').classList.remove('hidden');
  document.getElementById('add-money-overlay').classList.add('flex');
}

function closeAddMoney() {
  document.getElementById('add-money-overlay').classList.add('hidden');
  document.getElementById('add-money-overlay').classList.remove('flex');
}

function quickAdd(amount) {
  balance += amount;
  saveBalance();
  updateBalanceDisplay();
  updateCartTotals();
  showToast(`৳${amount} added to your balance!`);
}

function addCustomAmount() {
  let val = parseInt(document.getElementById('custom-amount').value);
  if (isNaN(val) || val <= 0) {
    showToast('Please enter a valid amount.');
    return;
  }

  balance += val;
  document.getElementById('custom-amount').value = '';
  saveBalance();
  updateBalanceDisplay();
  updateCartTotals();
  showToast(`৳${val} added to your balance!`);
}

function saveCart() {
  localStorage.setItem('sakibsmart_cart', JSON.stringify(cart));
}

function saveBalance() {
  localStorage.setItem('sakibsmartt_balance', balance.toString());
}
