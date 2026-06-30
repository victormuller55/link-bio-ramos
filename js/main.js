/**
 * Inicialização principal da link bio
 */
document.addEventListener('DOMContentLoaded', () => {
  VideoPlayer.init();
  Gallery.init();
  Animations.init();
  applyConfig();
});

function applyConfig() {
  if (typeof CONFIG === 'undefined') return;

  const { social } = CONFIG;

  const linkMap = {
    youtube: social.youtube,
    instagram: social.instagram,
    whatsapp: social.whatsapp,
    tiktok: social.tiktok,
  };

  Object.entries(linkMap).forEach(([platform, url]) => {
    const link = document.querySelector(`.links__item[data-platform="${platform}"]`);
    if (link && url) link.href = url;
  });
}
