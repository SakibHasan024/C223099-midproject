// banner.js - image slider

let slide = 0;
let total = 4;
let bannerTimer;

function initBanner() {
  let dotsEl = document.getElementById('banner-dots');
  dotsEl.innerHTML = '';

  for (let i = 0; i < total; i++) {
    let dot = document.createElement('button');
    dot.className = i === 0
      ? 'w-6 h-2 rounded-full bg-primary cursor-pointer transition-all'
      : 'w-2 h-2 rounded-full bg-white/30 cursor-pointer transition-all';
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);
  }

  bannerTimer = setInterval(() => {
    slide = (slide + 1) % total;
    goToSlide(slide);
  }, 5000);
}

function goToSlide(n) {
  slide = n;
  document.getElementById('banner-slides').style.transform = 'translateX(-' + slide * 100 + '%)';
  document.querySelectorAll('#banner-dots button').forEach((dot, i) => {
    dot.className = i === slide
      ? 'w-6 h-2 rounded-full bg-primary cursor-pointer transition-all'
      : 'w-2 h-2 rounded-full bg-white/30 cursor-pointer transition-all';
  });
}

function nextSlide() {
  clearInterval(bannerTimer);
  slide = (slide + 1) % total;
  goToSlide(slide);
  bannerTimer = setInterval(() => {
    slide = (slide + 1) % total;
    goToSlide(slide);
  }, 5000);
}

function prevSlide() {
  clearInterval(bannerTimer);
  slide = (slide - 1 + total) % total;
  goToSlide(slide);
  bannerTimer = setInterval(() => {
    slide = (slide + 1) % total;
    goToSlide(slide);
  }, 5000);
}
