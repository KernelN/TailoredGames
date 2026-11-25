/**
 * Tailored Games — Carousel Module
 * Handles auto-advancing slideshows with pause-on-hover, touch swiping, and dot navigation.
 */

class CorpfolioCarousel {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.slidesWrapper = this.container.querySelector('.carousel-slides');
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.dots = this.container.querySelectorAll('.carousel-dot');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.intervalMs = options.interval || 3500;
    this.timer = null;
    this.isPaused = false;

    // Touch gesture state
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.totalSlides > 1) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.startAutoPlay();
    this.updateUI();
  }

  bindEvents() {
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());
    this.container.addEventListener('focusin', () => this.pause());
    this.container.addEventListener('focusout', () => this.resume());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        this.goTo(index);
      });
    });

    // Touch Swipe Support
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.pause();
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
      this.resume();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const threshold = 40; // minimum pixels for a swipe

    if (swipeDistance > threshold) {
      this.prev();
    } else if (swipeDistance < -threshold) {
      this.next();
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.intervalMs);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  goTo(index) {
    this.currentIndex = (index + this.totalSlides) % this.totalSlides;
    this.updateUI();
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  updateUI() {
    if (!this.slidesWrapper) return;
    this.slidesWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  destroy() {
    this.stopAutoPlay();
  }
}

// Global initialization helper
window.initCarousels = function() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    new CorpfolioCarousel(wrapper);
  });
};
