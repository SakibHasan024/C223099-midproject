// ui.js - small ui helpers

function toggleTheme() {
  let html = document.documentElement;
  let icon = document.getElementById('theme-icon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.textContent = '🌙';
    localStorage.setItem('sakibsmart_theme', 'light');
  } else {
    html.classList.add('dark');
    icon.textContent = '☀️';
    localStorage.setItem('sakibsmart_theme', 'dark');
  }
}

function initTheme() {
  let saved = localStorage.getItem('sakibsmart_theme');
  let icon = document.getElementById('theme-icon');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    icon.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    icon.textContent = '🌙';
  }
}

function initNavbarScroll() {
  let nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    else nav.style.boxShadow = 'none';

    updateActiveLink();
  });
}

function updateActiveLink() {
  let sections = ['home', 'products', 'reviews', 'contact'];
  let top = window.scrollY + 140;
  let active = 'home';

  sections.forEach(id => {
    let el = document.getElementById(id);
    if (el && el.offsetTop <= top) active = id;
  });

  document.querySelectorAll('[data-section]').forEach(link => {
    let section = link.getAttribute('data-section');
    const isActive = section === active;

    link.classList.toggle('bg-blue-600', isActive);
    link.classList.toggle('text-white', isActive);
    link.classList.toggle('shadow-sm', isActive);
    link.classList.toggle('dark:bg-cyan-500/20', isActive);
    link.classList.toggle('dark:text-white', isActive);
    link.classList.toggle('text-slate-500', !isActive);
    link.classList.toggle('dark:text-slate-400', !isActive);
    link.classList.toggle('hover:text-slate-900', !isActive);
    link.classList.toggle('dark:hover:text-white', !isActive);
  });
}

function toggleMobileMenu() {
  let menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
}

let toastDiv = null;
var toastTimer = null;

function showToast(message) {
  if (!toastDiv) {
    toastDiv = document.createElement('div');
    toastDiv.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-muted text-white px-6 py-3 rounded-full font-heading text-sm z-50 whitespace-nowrap hidden';
    document.body.appendChild(toastDiv);
  }

  clearTimeout(toastTimer);
  toastDiv.textContent = message;
  toastDiv.classList.remove('hidden');

  toastTimer = setTimeout(() => {
    toastDiv.classList.add('hidden');
  }, 2500);
}

function submitContact(e) {
  e.preventDefault();

  let name = document.getElementById('contact-name').value.trim();
  let email = document.getElementById('contact-email').value.trim();
  let msg = document.getElementById('contact-msg').value.trim();
  let valid = true;

  ['name', 'email', 'msg'].forEach(f => {
    document.getElementById(`err-${f}`).classList.add('hidden');
  });

  if (!name) {
    document.getElementById('err-name').classList.remove('hidden');
    valid = false;
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    document.getElementById('err-email').classList.remove('hidden');
    valid = false;
  }
  if (!msg) {
    document.getElementById('err-msg').classList.remove('hidden');
    valid = false;
  }

  if (!valid) return;

  document.getElementById('contact-form').reset();
  document.getElementById('contact-success').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('contact-success').classList.add('hidden');
  }, 5000);

  showToast("Message sent! We'll be in touch.");
}

function subscribeNewsletter() {
  let email = document.getElementById('newsletter-email').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email.');
    return;
  }

  document.getElementById('newsletter-email').value = '';
  document.getElementById('newsletter-msg').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('newsletter-msg').classList.add('hidden');
  }, 4000);
  showToast('Subscribed! 🎉');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
