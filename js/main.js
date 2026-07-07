/**
 * Inicialização principal da link bio
 */
document.addEventListener('DOMContentLoaded', async () => {
  const loaded = await carregarBioLink();
  if (!loaded) return;

  if (!document.getElementById('video')?.hidden) {
    VideoPlayer.init();
  }

  if (!document.getElementById('galeria')?.hidden) {
    Gallery.init();
  }
  Animations.init();
});
