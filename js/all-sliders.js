<script>
(function() {
  'use strict';

  // ====== SLIDER V3 ======
  const CustomSliderV3 = {
    container: null,
    slides: [],
    dots: [],
    progressBar: null,
    currentIndex: 0,
    autoPlayInterval: null,
    progressInterval: null,
    autoPlayDuration: 5000,
    progressWidth: 0,

    init: function() {
      this.container = document.getElementById('customSliderV3Main');
      if (!this.container) return;
      this.slides = this.container.querySelectorAll('.custom-slider-v3-slide');
      this.dots = this.container.querySelectorAll('.custom-slider-v3-dot');
      this.progressBar = this.container.querySelector('.custom-slider-v3-progress-bar');
      if (this.slides.length === 0) return;
      this.setupEventListeners();
      this.startAutoPlay();
    },

    setupEventListeners: function() {
      const self = this;
      this.container.addEventListener('click', function(e) {
        if (e.target.classList.contains('custom-slider-v3-dot') || e.target.closest('.custom-slider-v3-arrow')) return;
        self.nextSlide();
        self.resetAutoPlay();
      });
      this.dots.forEach(function(dot, index) {
        dot.addEventListener('click', function(e) {
          e.stopPropagation();
          self.goToSlide(index);
          self.resetAutoPlay();
        });
      });
      const arrowPrev = document.getElementById('sliderArrowPrev');
      if (arrowPrev) {
        arrowPrev.addEventListener('click', function(e) {
          e.stopPropagation();
          self.prevSlide();
          self.resetAutoPlay();
        });
      }
      const arrowNext = document.getElementById('sliderArrowNext');
      if (arrowNext) {
        arrowNext.addEventListener('click', function(e) {
          e.stopPropagation();
          self.nextSlide();
          self.resetAutoPlay();
        });
      }
      this.container.addEventListener('mouseenter', function() { self.pauseAutoPlay(); });
      this.container.addEventListener('mouseleave', function() { self.startAutoPlay(); });
      let touchStartX = 0, touchEndX = 0;
      this.container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        self.pauseAutoPlay();
      });
      this.container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        self.handleSwipe(touchStartX, touchEndX);
        self.startAutoPlay();
      });
    },

    handleSwipe: function(startX, endX) {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide(); else this.prevSlide();
        this.resetAutoPlay();
      }
    },

    goToSlide: function(index) {
      this.slides[this.currentIndex].classList.remove('custom-slider-v3-active');
      this.dots[this.currentIndex].classList.remove('custom-slider-v3-dot-active');
      this.currentIndex = index;
      this.slides[this.currentIndex].classList.add('custom-slider-v3-active');
      this.dots[this.currentIndex].classList.add('custom-slider-v3-dot-active');
      this.progressWidth = 0;
      this.updateProgress();
    },

    nextSlide: function() { this.goToSlide((this.currentIndex + 1) % this.slides.length); },
    prevSlide: function() { this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length); },

    startAutoPlay: function() {
      const self = this;
      this.pauseAutoPlay();
      this.autoPlayInterval = setInterval(function() { self.nextSlide(); }, this.autoPlayDuration);
      this.progressInterval = setInterval(function() {
        self.progressWidth += (100 / (self.autoPlayDuration / 100));
        if (self.progressWidth > 100) self.progressWidth = 0;
        self.updateProgress();
      }, 100);
    },

    pauseAutoPlay: function() {
      if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; }
      if (this.progressInterval) { clearInterval(this.progressInterval); this.progressInterval = null; }
    },

    resetAutoPlay: function() { this.progressWidth = 0; this.updateProgress(); this.startAutoPlay(); },
    updateProgress: function() { if (this.progressBar) this.progressBar.style.width = this.progressWidth + '%'; }
  };

  // ====== AUTO SLIDER ======
  const CustomAutoSlider = {
    container: null,
    slides: [],
    dots: [],
    progressBar: null,
    currentIndex: 0,
    autoPlayInterval: null,
    progressInterval: null,
    autoPlayDuration: 5000,
    progressWidth: 0,

    init: function() {
      this.container = document.getElementById('customAutoSliderMain');
      if (!this.container) return;
      this.slides = this.container.querySelectorAll('.custom-auto-slider-slide');
      this.dots = this.container.querySelectorAll('.custom-auto-slider-dot');
      this.progressBar = this.container.querySelector('.custom-auto-slider-progress-bar');
      if (this.slides.length === 0) return;
      this.setupEventListeners();
      this.startAutoPlay();
    },

    setupEventListeners: function() {
      const self = this;
      this.container.addEventListener('click', function(e) {
        if (e.target.classList.contains('custom-auto-slider-dot') || e.target.closest('.custom-auto-slider-arrow')) return;
        self.nextSlide();
        self.resetAutoPlay();
      });
      this.dots.forEach(function(dot, index) {
        dot.addEventListener('click', function(e) {
          e.stopPropagation();
          self.goToSlide(index);
          self.resetAutoPlay();
        });
      });
      const arrowPrev = document.getElementById('autoSliderArrowPrev');
      if (arrowPrev) {
        arrowPrev.addEventListener('click', function(e) {
          e.stopPropagation();
          self.prevSlide();
          self.resetAutoPlay();
        });
      }
      const arrowNext = document.getElementById('autoSliderArrowNext');
      if (arrowNext) {
        arrowNext.addEventListener('click', function(e) {
          e.stopPropagation();
          self.nextSlide();
          self.resetAutoPlay();
        });
      }
      this.container.addEventListener('mouseenter', function() { self.pauseAutoPlay(); });
      this.container.addEventListener('mouseleave', function() { self.startAutoPlay(); });
      let touchStartX = 0, touchEndX = 0;
      this.container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        self.pauseAutoPlay();
      });
      this.container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        self.handleSwipe(touchStartX, touchEndX);
        self.startAutoPlay();
      });
    },

    handleSwipe: function(startX, endX) {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide(); else this.prevSlide();
        this.resetAutoPlay();
      }
    },

    goToSlide: function(index) {
      this.slides[this.currentIndex].classList.remove('custom-auto-slider-active');
      this.dots[this.currentIndex].classList.remove('custom-auto-slider-dot-active');
      this.currentIndex = index;
      this.slides[this.currentIndex].classList.add('custom-auto-slider-active');
      this.dots[this.currentIndex].classList.add('custom-auto-slider-dot-active');
      this.progressWidth = 0;
      this.updateProgress();
    },

    nextSlide: function() { this.goToSlide((this.currentIndex + 1) % this.slides.length); },
    prevSlide: function() { this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length); },

    startAutoPlay: function() {
      const self = this;
      this.pauseAutoPlay();
      this.autoPlayInterval = setInterval(function() { self.nextSlide(); }, this.autoPlayDuration);
      this.progressInterval = setInterval(function() {
        self.progressWidth += (100 / (self.autoPlayDuration / 100));
        if (self.progressWidth > 100) self.progressWidth = 0;
        self.updateProgress();
      }, 100);
    },

    pauseAutoPlay: function() {
      if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; }
      if (this.progressInterval) { clearInterval(this.progressInterval); this.progressInterval = null; }
    },

    resetAutoPlay: function() { this.progressWidth = 0; this.updateProgress(); this.startAutoPlay(); },
    updateProgress: function() { if (this.progressBar) this.progressBar.style.width = this.progressWidth + '%'; }
  };

  // ====== SLIDER V2 ======
  const CustomSliderV2 = {
    container: null,
    slides: [],
    dots: [],
    progressBar: null,
    currentIndex: 0,
    autoPlayInterval: null,
    progressInterval: null,
    autoPlayDuration: 5000,
    progressWidth: 0,

    init: function() {
      this.container = document.getElementById('customSliderV2Main');
      if (!this.container) return;
      this.slides = this.container.querySelectorAll('.custom-slider-v2-slide');
      this.dots = this.container.querySelectorAll('.custom-slider-v2-dot');
      this.progressBar = this.container.querySelector('.custom-slider-v2-progress-bar');
      if (this.slides.length === 0) return;
      this.setupEventListeners();
      this.startAutoPlay();
    },

    setupEventListeners: function() {
      const self = this;
      this.container.addEventListener('click', function(e) {
        if (e.target.classList.contains('custom-slider-v2-dot') || e.target.closest('.custom-slider-v2-arrow')) return;
        self.nextSlide();
        self.resetAutoPlay();
      });
      this.dots.forEach(function(dot, index) {
        dot.addEventListener('click', function(e) {
          e.stopPropagation();
          self.goToSlide(index);
          self.resetAutoPlay();
        });
      });
      const arrowPrev = document.getElementById('sliderV2ArrowPrev');
      if (arrowPrev) {
        arrowPrev.addEventListener('click', function(e) {
          e.stopPropagation();
          self.prevSlide();
          self.resetAutoPlay();
        });
      }
      const arrowNext = document.getElementById('sliderV2ArrowNext');
      if (arrowNext) {
        arrowNext.addEventListener('click', function(e) {
          e.stopPropagation();
          self.nextSlide();
          self.resetAutoPlay();
        });
      }
      this.container.addEventListener('mouseenter', function() { self.pauseAutoPlay(); });
      this.container.addEventListener('mouseleave', function() { self.startAutoPlay(); });
      let touchStartX = 0, touchEndX = 0;
      this.container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        self.pauseAutoPlay();
      });
      this.container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        self.handleSwipe(touchStartX, touchEndX);
        self.startAutoPlay();
      });
    },

    handleSwipe: function(startX, endX) {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide(); else this.prevSlide();
        this.resetAutoPlay();
      }
    },

    goToSlide: function(index) {
      this.slides[this.currentIndex].classList.remove('custom-slider-v2-active');
      this.dots[this.currentIndex].classList.remove('custom-slider-v2-dot-active');
      this.currentIndex = index;
      this.slides[this.currentIndex].classList.add('custom-slider-v2-active');
      this.dots[this.currentIndex].classList.add('custom-slider-v2-dot-active');
      this.progressWidth = 0;
      this.updateProgress();
    },

    nextSlide: function() { this.goToSlide((this.currentIndex + 1) % this.slides.length); },
    prevSlide: function() { this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length); },

    startAutoPlay: function() {
      const self = this;
      this.pauseAutoPlay();
      this.autoPlayInterval = setInterval(function() { self.nextSlide(); }, this.autoPlayDuration);
      this.progressInterval = setInterval(function() {
        self.progressWidth += (100 / (self.autoPlayDuration / 100));
        if (self.progressWidth > 100) self.progressWidth = 0;
        self.updateProgress();
      }, 100);
    },

    pauseAutoPlay: function() {
      if (this.autoPlayInterval) { clearInterval(this.autoPlayInterval); this.autoPlayInterval = null; }
      if (this.progressInterval) { clearInterval(this.progressInterval); this.progressInterval = null; }
    },

    resetAutoPlay: function() { this.progressWidth = 0; this.updateProgress(); this.startAutoPlay(); },
    updateProgress: function() { if (this.progressBar) this.progressBar.style.width = this.progressWidth + '%'; }
  };

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
</script>
