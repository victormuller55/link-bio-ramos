/**
 * Galeria mobile — carrossel snap + lightbox
 */
const Gallery = {
  carousel: null,
  cards: [],
  dots: [],
  counter: null,
  modal: null,
  modalImg: null,
  modalCaption: null,
  activeIndex: 0,

  init() {
    renderGallery();
    this.carousel = document.getElementById('galleryCarousel');
    this.cards = [...document.querySelectorAll('[data-gallery-card]')];
    this.dots = [...document.querySelectorAll('[data-dot]')];
    this.counter = document.getElementById('galleryCounter');
    this.modal = document.getElementById('galleryModal');
    this.modalImg = document.getElementById('galleryModalImg');
    this.modalCaption = document.getElementById('galleryModalCaption');

    if (!this.carousel || !this.cards.length) return;

    this.bindEvents();
    this.updateActive(0);
  },

  bindEvents() {
    let scrollTimeout;
    this.carousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.onScroll(), 60);
    }, { passive: true });

    this.dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.dot);
        this.scrollTo(index);
      });
    });

    document.getElementById('galleryTrack')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery__photo-wrap');
      if (!btn) return;
      const card = btn.closest('[data-gallery-card]');
      const index = Number(card?.dataset.index ?? 0);
      const item = CONFIG.gallery[index];
      if (!item) return;
      this.open(item.src, item.alt, item.title, item.text);
    });

    if (this.modal) {
      this.modal.querySelector('.gallery-modal__close')?.addEventListener('click', () => this.close());
      this.modal.querySelector('.gallery-modal__backdrop')?.addEventListener('click', () => this.close());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.modal.hidden) this.close();
      });
    }
  },

  onScroll() {
    const scrollLeft = this.carousel.scrollLeft;
    const cardWidth = this.cards[0]?.offsetWidth ?? 1;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    this.updateActive(Math.min(index, this.cards.length - 1));
  },

  scrollTo(index) {
    const card = this.cards[index];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    this.updateActive(index);
  },

  updateActive(index) {
    this.activeIndex = index;

    this.cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === index);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    if (this.counter) {
      this.counter.textContent = `${index + 1} / ${this.cards.length}`;
    }
  },

  open(src, alt, title, text) {
    if (!this.modal || !this.modalImg) return;

    this.modalImg.src = src;
    this.modalImg.alt = alt;

    if (this.modalCaption) {
      this.modalCaption.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
      `;
    }

    this.modal.hidden = false;
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.modal) return;
    this.modal.hidden = true;
    this.modalImg.src = '';
    document.body.style.overflow = '';
  },
};
