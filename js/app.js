// app.js — entry point, bootstraps the whole application

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBanner();
  loadProducts();
  loadReviews();
  initNavbarScroll();
  initLogin();

  updateCartCount();
  updateBalanceDisplay();
});
