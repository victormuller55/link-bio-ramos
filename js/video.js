/**
 * Controle do modal de vídeo do YouTube
 */
const VideoPlayer = {
  modal: null,
  iframe: null,
  playerBtn: null,

  init() {
    this.modal = document.getElementById('videoModal');
    this.iframe = document.getElementById('videoIframe');
    this.playerBtn = document.querySelector('.media__player');

    if (!this.modal || !this.iframe || !this.playerBtn) return;

    this.playerBtn.addEventListener('click', () => this.open());
    this.modal.querySelector('.video-modal__close').addEventListener('click', () => this.close());
    this.modal.querySelector('.video-modal__backdrop').addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.hidden) {
        this.close();
      }
    });
  },

  open() {
    const videoId = CONFIG.video.youtubeId;
    this.iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    this.modal.hidden = false;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.modal.hidden = true;
    this.iframe.src = '';
    document.body.style.overflow = '';
  },
};
