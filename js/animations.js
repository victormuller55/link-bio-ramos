/**
 * Animações de entrada e interações visuais
 */
const Animations = {
  _revealObserver: null,

  REVEAL_SELECTOR: [
    '.header',
    '.media',
    '.links > .campaign-banner',
    '.links__card',
    '.campaign-panel .campaign-banner',
    '.about__card',
    '.gallery > .campaign-banner',
    '.gallery__hint',
    '.gallery__carousel',
    '.gallery__nav',
    '.footer',
  ].join(', '),

  init() {
    this.initScrollReveal();
    this.ensureRippleStyle();
  },

  initScrollReveal() {
    this.observeElements(document.querySelectorAll(this.REVEAL_SELECTOR));
  },

  observeLinkItems() {
    const items = document.querySelectorAll('.links__item');
    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 0.07, 0.42)}s`);
    });
    this.observeElements(items);
  },

  observeElements(elements) {
    const targets = [...elements].filter(Boolean);
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => {
        el.classList.add('scroll-reveal', 'is-visible');
      });
      return;
    }

    if (!this._revealObserver) {
      this._revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this._revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
    }

    targets.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      el.classList.add('scroll-reveal');
      this._revealObserver.observe(el);
    });
  },

  attachRippleToLinks() {
    this.ensureRippleStyle();
    this.observeLinkItems();

    document.querySelectorAll('.links__item').forEach((link) => {
      if (link.dataset.rippleBound) return;
      link.dataset.rippleBound = 'true';

      link.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
          background: rgba(168, 214, 105, 0.25);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
        `;

        link.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  },

  ensureRippleStyle() {
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleEffect {
          to { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  },
};
