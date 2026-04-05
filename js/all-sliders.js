(function() {
  'use strict';

  const AUTO_DURATION = 3000; // 🔥 GLOBAL 3 DETIK

  // ====== BASE FUNCTION (biar tidak duplikat) ======
  function createSlider(config) {
    return {
      container: null,
      slides: [],
      progressBar: null,
      currentIndex: 0,
      autoPlayInterval: null,
      progressInterval: null,
      autoPlayDuration: AUTO_DURATION,
      progressWidth: 0,

      init: function() {
        this.container = document.getElementById(config.containerId);
        if (!this.container) return;

        this.slides = this.container.querySelectorAll(config.slideClass);
        this.progressBar = this.container.querySelector(config.progressClass);

        if (this.slides.length === 0) return;

        this.setupEventListeners();
        this.startAutoPlay();
      },

      setupEventListeners: function() {
        const self = this;

        this.container.addEventListener('click', function(e) {
          if (e.target.closest(config.arrowClass)) return;
          self.nextSlide();
          self.resetAutoPlay();
        });

        const arrowPrev = document.getElementById(config.prevId);
        if (arrowPrev) {
          arrowPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            self.prevSlide();
            self.resetAutoPlay();
          });
        }

        const arrowNext = document.getElementById(config.nextId);
        if (arrowNext) {
          arrowNext.addEventListener('click', function(e) {
            e.stopPropagation();
            self.nextSlide();
            self.resetAutoPlay();
          });
        }

        this.container.addEventListener('mouseenter', () => self.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => self.startAutoPlay());

        let touchStartX = 0;

        this.container.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
          self.pauseAutoPlay();
        });

        this.container.addEventListener('touchend', function(e) {
          const touchEndX = e.changedTouches[0].screenX;
          self.handleSwipe(touchStartX, touchEndX);
          self.startAutoPlay();
        });
      },

      handleSwipe: function(startX, endX) {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? this.nextSlide() : this.prevSlide();
          this.resetAutoPlay();
        }
      },

      goToSlide: function(index) {
        this.slides[this.currentIndex].classList.remove(config.activeClass);
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add(config.activeClass);

        this.progressWidth = 0;
        this.updateProgress();
      },

      nextSlide: function() {
        this.goToSlide((this.currentIndex + 1) % this.slides.length);
      },

      prevSlide: function() {
        this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
      },

      startAutoPlay: function() {
        this.pauseAutoPlay();

        this.autoPlayInterval = setInterval(() => {
          this.nextSlide();
        }, this.autoPlayDuration);

        this.progressInterval = setInterval(() => {
          this.progressWidth += (100 / (this.autoPlayDuration / 100));

          if (this.progressWidth > 100) this.progressWidth = 0;

          this.updateProgress();
        }, 100);
      },

      pauseAutoPlay: function() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        if (this.progressInterval) clearInterval(this.progressInterval);
      },

      resetAutoPlay: function() {
        this.progressWidth = 0;
        this.updateProgress();
        this.startAutoPlay();
      },

      updateProgress: function() {
        if (this.progressBar) {
          this.progressBar.style.width = this.progressWidth + '%';
        }
      }
    };
  }

  // ====== INIT SLIDERS ======
  const CustomSliderV3 = createSlider({
    containerId: 'customSliderV3Main',
    slideClass: '.custom-slider-v3-slide',
    progressClass: '.custom-slider-v3-progress-bar',
    activeClass: 'custom-slider-v3-active',
    arrowClass: '.custom-slider-v3-arrow',
    prevId: 'sliderArrowPrev',
    nextId: 'sliderArrowNext'
  });

  const CustomAutoSlider = createSlider({
    containerId: 'customAutoSliderMain',
    slideClass: '.custom-auto-slider-slide',
    progressClass: '.custom-auto-slider-progress-bar',
    activeClass: 'custom-auto-slider-active',
    arrowClass: '.custom-auto-slider-arrow',
    prevId: 'autoSliderArrowPrev',
    nextId: 'autoSliderArrowNext'
  });

  const CustomSliderV2 = createSlider({
    containerId: 'customSliderV2Main',
    slideClass: '.custom-slider-v2-slide',
    progressClass: '.custom-slider-v2-progress-bar',
    activeClass: 'custom-slider-v2-active',
    arrowClass: '.custom-slider-v2-arrow',
    prevId: 'sliderV2ArrowPrev',
    nextId: 'sliderV2ArrowNext'
  });

  // ====== INIT ALL ======
  function initAll() {
    CustomSliderV3.init();
    CustomAutoSlider.init();
    CustomSliderV2.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();