/**
 * Renderiza carrossel mobile — card com foto + legenda
 */
function renderGallery() {
  const track = document.getElementById('galleryTrack');
  const dots = document.getElementById('galleryDots');
  if (!track || typeof CONFIG === 'undefined' || !CONFIG.gallery) return;

  track.innerHTML = CONFIG.gallery.map((item, index) => {
    const num = String(index + 1).padStart(2, '0');

    return `
      <article class="gallery__card${index === 0 ? ' is-active' : ''}" data-gallery-card data-index="${index}">
        <button class="gallery__photo-wrap" type="button" aria-label="Ampliar foto: ${item.title}">
          <img src="${item.src}" alt="${item.alt}" loading="${index < 2 ? 'eager' : 'lazy'}">
          <span class="gallery__badge">${num}</span>
          <span class="gallery__expand" aria-hidden="true">⤢</span>
        </button>
        <div class="gallery__caption">
          <h3 class="gallery__caption-title">${item.title}</h3>
          <p class="gallery__caption-desc">${item.text}</p>
        </div>
      </article>
    `;
  }).join('');

  if (dots) {
    dots.innerHTML = CONFIG.gallery.map((_, index) => `
      <button
        class="gallery__dot${index === 0 ? ' is-active' : ''}"
        type="button"
        aria-label="Ir para foto ${index + 1}"
        data-dot="${index}"
      ></button>
    `).join('');
  }
}
