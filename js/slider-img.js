
 
(function () {
  'use strict';

  const ARROW_IMG = 'https://dirqenstudio23.github.io/kitbashed/images/KitbashedCreative-Short_arrow.png';

  function initSlider(wrapper) {
    const slides    = Array.from(wrapper.querySelectorAll('.dyn-slide'));
    const duration  = parseInt(wrapper.dataset.autoplay) || 5000;
    const isCentered = wrapper.classList.contains('slider-centered');

    if (!slides.length) return;

    let current = slides.findIndex(s => s.classList.contains('active'));
    if (current < 0) current = 0;

    let autoTimer = null;
    let touchStartX = 0;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'dyn-arrow dyn-arrow-prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = `<img src="${ARROW_IMG}" alt="prev">`;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'dyn-arrow dyn-arrow-next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = `<img src="${ARROW_IMG}" alt="next">`;

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);

    let dots = [];
    if (!isCentered) {
      const dotsEl = document.createElement('div');
      dotsEl.className = 'dyn-dots';
      slides.forEach(function (_, i) {
        const dot = document.createElement('span');
        dot.className = 'dyn-dot' + (i === current ? ' active' : '');
        dot.addEventListener('click', function (e) {
          e.stopPropagation();
          goTo(i);
          resetAuto();
        });
        dotsEl.appendChild(dot);
        dots.push(dot);
      });
      wrapper.appendChild(dotsEl);
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, duration);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    function resetAuto() { startAuto(); }

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); resetAuto(); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); resetAuto(); });

    wrapper.addEventListener('click', function (e) {
      if (e.target.closest('.dyn-arrow') || e.target.classList.contains('dyn-dot')) return;
      next();
      resetAuto();
    });

    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);

    wrapper.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    });

    wrapper.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); resetAuto(); }
      else startAuto();
    });

    startAuto();
  }

  function initAll() {
    document.querySelectorAll('.dyn-slider').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})(); 
