/**
 * Inicialização principal da link bio
 */
document.addEventListener('DOMContentLoaded', async () => {
  const loaded = await carregarBioLink();
  if (!loaded) return;

  VideoPlayer.init();
  Gallery.init();
  Animations.init();
});
