// products.js - load and show products

let products = [];
let wishlist = JSON.parse(localStorage.getItem('sakibsmart_wishlist') || '[]');
let view = 'all';

const storeFallbackProducts = [
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
  },
  {
    id: 107,
    title: 'RTX 4080 Gaming Graphics Card',
    price: 185000,
    category: 'Gaming',
    description: 'High-performance graphics card built for 4K gaming, streaming, and smooth ultra settings.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.9, count: 368 }
  },
  {
    id: 108,
    title: 'Steam Deck OLED Console',
    price: 68000,
    category: 'Gaming',
    description: 'Portable all-in-one handheld gaming console with vivid display and lightweight design.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 255 }
  },
  {
    id: 201,
    title: '4K Smart LED TV',
    price: 52000,
    category: 'Electronics',
    description: 'Ultra HD smart television with rich colors, voice control, and cinematic viewing experience.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 231 }
  },
  {
    id: 202,
    title: 'Double Door Refrigerator',
    price: 48000,
    category: 'Electronics',
    description: 'Spacious frost-free fridge with efficient cooling, smart storage, and energy-saving design.',
    image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.6, count: 189 }
  },
  {
    id: 203,
    title: 'Inverter Air Conditioner',
    price: 62000,
    category: 'Electronics',
    description: 'Fast cooling inverter AC with eco mode, silent operation, and modern smart controls.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 274 }
  },
  {
    id: 204,
    title: 'Front Load Washing Machine',
    price: 44000,
    category: 'Electronics',
    description: 'Compact energy-efficient washing machine with multiple wash programs and quiet performance.',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.5, count: 176 }
  },
  {
    id: 205,
    title: 'Bluetooth Sound Bar',
    price: 21000,
    category: 'Electronics',
    description: 'Slim premium sound bar with crisp audio, deep bass, and seamless wireless connectivity.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 214 }
  },
  {
    id: 206,
    title: 'Home Theater Speaker Set',
    price: 29000,
    category: 'Electronics',
    description: 'Immersive surround audio setup for movies, music, and game nights at home.',
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 198 }
  },
  {
    id: 301,
    title: 'Premium Whey Protein',
    price: 6500,
    category: 'Fitness',
    description: 'High-quality whey protein for muscle recovery, lean gains, and daily fitness support.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 312 }
  },
  {
    id: 302,
    title: 'Creatine Monohydrate',
    price: 4200,
    category: 'Fitness',
    description: 'Fast-absorbing creatine formula designed to boost strength, stamina, and performance.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 287 }
  },
  {
    id: 303,
    title: 'Pre-Workout Energy Booster',
    price: 5500,
    category: 'Fitness',
    description: 'Explosive energy blend with focus support to power your workouts and maximize intensity.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.6, count: 219 }
  },
  {
    id: 304,
    title: 'Mass Gainer Protein',
    price: 7200,
    category: 'Fitness',
    description: 'Calorie-rich mass gainer for muscle building, recovery, and healthy weight gain support.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 245 }
  },
  {
    id: 305,
    title: 'BCAA Recovery Formula',
    price: 4800,
    category: 'Fitness',
    description: 'Recovery support blend to reduce post-workout fatigue and help maintain lean muscle.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.5, count: 207 }
  },
  {
    id: 401,
    title: 'Cedar & Citrus Eau de Parfum',
    price: 5800,
    category: 'Perfume',
    description: 'A balanced fragrance with bright citrus opening notes and a warm cedarwood finish.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.7, count: 184 }
  },
  {
    id: 402,
    title: 'Rose & Jasmine Eau de Parfum',
    price: 6400,
    category: 'Perfume',
    description: 'An elegant floral blend of rose, jasmine, and soft musk for everyday wear.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.8, count: 226 }
  },
  {
    id: 403,
    title: 'Amber Woods Eau de Parfum',
    price: 7200,
    category: 'Perfume',
    description: 'A long-lasting warm fragrance with amber, woods, and subtle spice notes.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    rating: { rate: 4.6, count: 153 }
  }
];

const preferredCategories = ['Gaming', 'Electronics', 'Fitness', 'Perfume'];

async function loadProducts() {
  products = storeFallbackProducts.map(item => ({ ...item }));
  populateCategories();
  renderProducts(products);
}

function populateCategories() {
  let cats = [...new Set(products.map(item => item.category))];
  cats = cats.sort((a, b) => {
    const ia = preferredCategories.indexOf(a);
    const ib = preferredCategories.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  let sel = document.getElementById('category-filter');
  sel.innerHTML = '<option value="all">All Categories</option>';
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
