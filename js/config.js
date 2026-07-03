/**
 * Configurações centrais da BioLink
 * Altere API_BASE_URL e SITE_ID aqui.
 */
const API_BASE_URL = 'https://api.convertix.net.br';
const SITE_ID = 2;
const DEFAULT_AVATAR = 'assets/default-avatar.svg';

/**
 * Configurações locais (vídeo, galeria) — não vêm da API pública.
 */
const CONFIG = {
  video: {
    youtubeId: 'SEU_VIDEO_ID_AQUI',
  },

  gallery: [
    {
      src: 'assets/galeria/foto-1.png',
      alt: 'RAMOS SOMAR em evento de campanha',
      title: 'Lançamento da campanha',
      text: 'Momento de abertura oficial em Goiânia, reforçando o compromisso com um Goiás mais justo.',
    },
    {
      src: 'assets/galeria/foto-2.png',
      alt: 'RAMOS SOMAR com apoiadores',
      title: 'Encontro com apoiadores',
      text: 'Conversando de perto com quem acredita que é da gente e é pra somar.',
    },
    {
      src: 'assets/galeria/foto-3.png',
      alt: 'RAMOS SOMAR nos bastidores',
      title: 'Bastidores da campanha',
      text: 'Preparação e planejamento das ações que levam nossa proposta a cada região do estado.',
    },
    {
      src: 'assets/galeria/foto-4.png',
      alt: 'RAMOS SOMAR no interior de Goiás',
      title: 'Interior de Goiás',
      text: 'Visitando cidades do interior para ouvir demandas de saúde, educação e infraestrutura.',
    },
    {
      src: 'assets/galeria/foto-5.png',
      alt: 'RAMOS SOMAR em reunião comunitária',
      title: 'Reunião comunitária',
      text: 'Diálogo direto com lideranças locais sobre os desafios do dia a dia das comunidades.',
    },
    {
      src: 'assets/galeria/foto-6.png',
      alt: 'RAMOS SOMAR — campanha',
      title: 'Juntos por Goiás',
      text: 'Cada passo é construído com o povo goiano. Nossa força vem de quem acredita na mudança.',
    },
  ],
};
