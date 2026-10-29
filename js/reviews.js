// reviews.js - customer reviews slider

let reviews = [];
let curPage = 0;
let perPage = 3;
let reviewTimer;

const reviewsData = [
  { name: 'Yasmin Alam', comment: 'Really fast delivery and the product quality is exactly what I expected. Will definitely order again from SakibsMart.', rating: 5, date: 'May 2, 2025', avatar: 'YA' },
  { name: 'Tasfia Alam', comment: 'Very nice Sakib. Customer service was also very responsive.', rating: 5, date: 'April 28, 2026', avatar: 'TA' },
  { name: 'Shah Alam', comment: "Honestly one of the best online shopping experiences I've had locally. Prices are fair and shipping is quick.", rating: 5, date: 'November 21, 2025', avatar: 'SA' },
  { name: 'ITN NAZRUL ISLAM', comment: 'The coupon code worked perfectly and saved me money. The cart updates automatically which is really convenient.', rating: 4, date: 'April 15, 2025', avatar: 'NI' },
  { name: 'Zubayer Khan Adil', comment: 'Website is clean and easy to use on my phone. The product images load quickly and descriptions are accurate.', rating: 5, date: 'April 9, 2026', avatar: 'ZA' },
  { name: 'Anika Raju', comment: 'I loved the wishlist feature — saved a bunch of products and came back to buy them later. Really useful addition.', rating: 4, date: 'March 30, 2026', avatar: 'AR' },
];

async function loadReviews() {
  try {
    let res = await fetch('data/reviews.json');
    if (!res.ok) throw new Error('Reviews fetch failed');
    reviews = await res.json();
  } catch (err) {
    reviews = reviewsData;
  }

  renderReviews();
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => {
    let pages = Math.ceil(reviews.length / getPerPage());
    goToReview((curPage + 1) % pages);
  }, 6000);
}

function getPerPage() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function renderReviews() {
  perPage = getPerPage();
  let box = document.getElementById('reviews-container');
  let dotsEl = document.getElementById('reviews-dots');

  box.innerHTML = '';
  dotsEl.innerHTML = '';

  let pages = Math.ceil(reviews.length / perPage);

  for (let page = 0; page < pages; page++) {
    let pageEl = document.createElement('div');
    pageEl.className = 'flex gap-6 min-w-full';

    let part = reviews.slice(page * perPage, (page + 1) * perPage);
    part.forEach(item => {
      pageEl.appendChild(makeCard(item));
    });

    box.appendChild(pageEl);
  }

  for (let i = 0; i < pages; i++) {
    let dot = document.createElement('button');
    dot.className = i === 0
      ? 'w-2 h-2 rounded-full bg-primary cursor-pointer transition-colors'
      : 'w-2 h-2 rounded-full bg-gray-400 dark:bg-white/20 cursor-pointer transition-colors';
    dotsEl.appendChild(dot);
  }

  goToReview(0);
}

function makeCard(item) {
  let stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
  let card = document.createElement('div');
  card.className = 'flex-1 bg-white dark:bg-dark border border-gray-200 dark:border-muted rounded-2xl p-6 flex flex-col gap-4';
  card.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-sm flex-shrink-0">${item.avatar}</div>
      <div>
        <p class="font-heading font-semibold text-sm">${item.name}</p>
        <p class="text-gray-500 text-xs">${item.date}</p>
      </div>
    </div>
    <p class="text-yellow-400 text-sm tracking-widest">${stars}</p>
    <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">"${item.comment}"</p>
  `;
  return card;
}

function goToReview(n) {
  perPage = getPerPage();
  let pages = Math.ceil(reviews.length / perPage);
  curPage = Math.max(0, Math.min(n, pages - 1));

  document.getElementById('reviews-container').style.transform = 'translateX(-' + curPage * 100 + '%)';
  document.querySelectorAll('#reviews-dots button').forEach((dot, i) => {
    dot.className = i === curPage
      ? 'w-2 h-2 rounded-full bg-primary cursor-pointer transition-colors'
      : 'w-2 h-2 rounded-full bg-gray-400 dark:bg-white/20 cursor-pointer transition-colors';
  });
}

function nextReview() {
  let pages = Math.ceil(reviews.length / getPerPage());
  clearInterval(reviewTimer);
  goToReview((curPage + 1) % pages);
  reviewTimer = setInterval(() => {
    let totalPages = Math.ceil(reviews.length / getPerPage());
    goToReview((curPage + 1) % totalPages);
  }, 6000);
}

function prevReview() {
  let pages = Math.ceil(reviews.length / getPerPage());
  clearInterval(reviewTimer);
  goToReview((curPage - 1 + pages) % pages);
  reviewTimer = setInterval(() => {
    let totalPages = Math.ceil(reviews.length / getPerPage());
    goToReview((curPage + 1) % totalPages);
  }, 6000);
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (reviews.length > 0) renderReviews();
  }, 300);
});
