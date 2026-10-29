// products.js - load and show products

let products = [];
let wishlist = JSON.parse(localStorage.getItem('sakibsmart_wishlist') || '[]');
let view = 'all';

const gamingFallbackProducts = [
  {
    id: 101,
    title: 'RGB Mechanical Keyboard',
    price: 5200,
    category: 'Gaming',
    description: 'Hot-swappable wireless keyboard with low-latency switches and customizable RGB lighting.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 271 }
  },
  {
    id: 102,
    title: 'Ultra-Light Gaming Mouse',
    price: 3400,
    category: 'Gaming',
    description: 'Precision gaming mouse designed for fast flick shots, smooth tracking, and zero-lag control.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 198 }
  },
  {
    id: 103,
    title: '4K Gaming Monitor',
    price: 8500,
    category: 'Gaming',
    description: 'Crisp 144Hz display with HDR support and ultra-fast response time for competitive gaming.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.9, count: 316 }
  },
  {
    id: 104,
    title: 'Pro Wireless Headset',
    price: 4700,
    category: 'Gaming',
    description: 'Immersive surround headset with noise cancellation, crystal mic, and long battery life.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 244 }
  },
  {
    id: 105,
    title: 'Gaming Controller',
    price: 2800,
    category: 'Gaming',
    description: 'Ergonomic controller with trigger locks and vibration feedback for a premium console feel.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.6, count: 172 }
  },
  {
    id: 106,
    title: 'Gaming Chair Pro',
    price: 7600,
    category: 'Gaming',
    description: 'High-back chair with lumbar support, recline function, and breathable fabric for long sessions.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.9, count: 204 }
  }
];

async function loadProducts() {
  try {
    let res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('API error');

    let fetched = await res.json();
    const gamingKeywords = ['gaming', 'mouse', 'keyboard', 'headphone', 'controller', 'monitor', 'chair'];
    const filtered = fetched.filter(item => {
      const haystack = `${item.title} ${item.category} ${item.description}`.toLowerCase();
      return gamingKeywords.some(keyword => haystack.includes(keyword));
    });

    products = (filtered.length ? filtered : gamingFallbackProducts)
      .map(item => ({ ...item, price: +(item.price * 110).toFixed(0) }));
    populateCategories();
    renderProducts(products);
  } catch (err) {
    products = gamingFallbackProducts.map(item => ({ ...item }));
    populateCategories();
    renderProducts(products);
  }
}

function populateCategories() {
  let cats = [...new Set(products.map(item => item.category))];
  let sel = document.getElementById('category-filter');
  cats.forEach(cat => {
    let opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    sel.appendChild(opt);
  });
}

function filterProducts() {
  let query = document.getElementById('search-input').value.toLowerCase().trim();
  let category = document.getElementById('category-filter').value;
  let sort = document.getElementById('sort-select').value;

  let filtered = view === 'wishlist'
    ? products.filter(item => wishlist.includes(item.id))
    : [...products];

  if (query) filtered = filtered.filter(item => item.title.toLowerCase().includes(query));
  if (category !== 'all') filtered = filtered.filter(item => item.category === category);

  if (sort === 'low-high') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'high-low') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating.rate - a.rating.rate);

  renderProducts(filtered);
}

function setProductView(mode) {
  view = mode;
  document.getElementById('view-all-btn').className =
    mode === 'all'
      ? 'font-heading text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-primary bg-primary text-white'
      : 'font-heading text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-gray-300 dark:border-muted text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary';

  document.getElementById('view-wish-btn').className =
    mode === 'wishlist'
      ? 'font-heading text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-primary bg-primary text-white'
      : 'font-heading text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-gray-300 dark:border-muted text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary';

  filterProducts();
}

function renderProducts(list) {
  let loading = document.getElementById('products-loading');
  let grid = document.getElementById('product-grid');
  let noResults = document.getElementById('no-results');

  loading.classList.add('hidden');

  if (list.length === 0) {
    grid.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = '';

  list.forEach(item => {
    let card = buildProductCard(item);
    grid.appendChild(card);
  });
}

function buildProductCard(product) {
  let wished = wishlist.includes(product.id);
  let stars = renderStars(product.rating.rate);
  let title = product.title.length > 50 ? product.title.slice(0, 50) + '…' : product.title;

  let card = document.createElement('div');
  card.className = 'bg-white dark:bg-card rounded-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-muted hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200';
  card.innerHTML = `
    <div class="relative p-6 bg-white flex items-center justify-center h-52 cursor-pointer" onclick="openProductModal(${product.id})">
      <img src="${product.image}" alt="${product.title}" class="h-full w-full object-contain transition-transform duration-300 hover:scale-105" loading="lazy" />
      <button class="wish-btn absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-lg ${wished ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-colors" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)" aria-label="Wishlist">
        ${wished ? '❤' : '♡'}
      </button>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <p class="text-xs text-gray-500 font-heading uppercase tracking-wider mb-1">${product.category}</p>
      <h3 class="text-sm font-body leading-snug mb-2 flex-1 cursor-pointer hover:text-primary transition-colors" onclick="openProductModal(${product.id})">${title}</h3>
      <div class="flex items-center gap-1 mb-3">
        <span class="text-yellow-400 text-sm tracking-wide">${stars}</span>
        <span class="text-gray-500 text-xs">(${product.rating.count})</span>
      </div>
      <div class="flex items-center justify-between mt-auto">
        <span class="font-heading font-bold text-lg text-gray-900 dark:text-white">৳${product.price}</span>
        <button onclick="addToCart(${product.id})" class="bg-primary text-white text-xs font-heading uppercase tracking-widest px-4 py-2 rounded-full hover:bg-red-600 transition-colors">Add to Cart</button>
      </div>
    </div>
  `;
  return card;
}

function renderStars(rating) {
  let full = Math.floor(rating);
  let half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '½';
  stars += '☆'.repeat(5 - full - (half ? 1 : 0));
  return stars;
}

function toggleWishlist(id, btn) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    btn.innerHTML = '♡';
    btn.classList.remove('text-primary');
    btn.classList.add('text-gray-300');
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    btn.innerHTML = '❤';
    btn.classList.remove('text-gray-300');
    btn.classList.add('text-primary');
    showToast('Added to wishlist ❤');
  }
  localStorage.setItem('sakibsmart_wishlist', JSON.stringify(wishlist));
}

function getProductById(id) {
  return products.find(item => item.id === id);
}

function openProductModal(id) {
  let product = getProductById(id);
  if (!product) return;

  let stars = renderStars(product.rating.rate);
  let modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="bg-white rounded-xl p-6 flex items-center justify-center">
        <img src="${product.image}" alt="${product.title}" class="h-48 object-contain" />
      </div>
      <p class="text-xs text-primary font-heading uppercase tracking-widest">${product.category}</p>
      <h3 class="font-heading font-bold text-lg leading-snug">${product.title}</h3>
      <div class="flex items-center gap-2">
        <span class="text-yellow-400">${stars}</span>
        <span class="text-gray-500 text-sm">${product.rating.rate} (${product.rating.count} reviews)</span>
      </div>
      <p class="text-gray-400 text-sm leading-relaxed">${product.description}</p>
      <div class="flex items-center justify-between">
        <span class="font-heading font-bold text-2xl">৳${product.price}</span>
        <button onclick="addToCart(${product.id}); closeProductModal()" class="bg-primary text-white font-heading text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-red-600 transition-colors">Add to Cart</button>
      </div>
    </div>
  `;

  document.getElementById('product-modal-overlay').classList.remove('hidden');
  document.getElementById('product-modal-overlay').classList.add('flex');
}

function closeProductModal() {
  document.getElementById('product-modal-overlay').classList.add('hidden');
  document.getElementById('product-modal-overlay').classList.remove('flex');
}
