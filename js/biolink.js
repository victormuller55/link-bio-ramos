/**
 * Carregamento, renderização e estados da BioLink pública.
 */

const ERROR_MESSAGES = {
  CONNECTION_ERROR: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
  API_ERROR: 'Erro ao carregar BioLink. Tente novamente.',
};

const PAGE_TITLE = document.title;

async function carregarBioLink() {
  mostrarErro(false);
  mostrarNotFound(false);
  mostrarConteudo(false);
  mostrarLoading(true);

  try {
    const siteId = getSiteId();
    const data = await buscarDados(siteId);

    renderizarPerfil(data);
    renderizarItens(data.itens || []);

    mostrarConteudo(true);
    mostrarLoading(false);

    if (typeof Animations !== 'undefined') {
      Animations.attachRippleToLinks();
    }

    return true;
  } catch (error) {
    mostrarLoading(false);

    if (error.message === 'NOT_FOUND') {
      mostrarNotFound(true);
      return false;
    }

    mostrarConteudo(true);
    const message = ERROR_MESSAGES[error.message] || ERROR_MESSAGES.API_ERROR;
    mostrarErro(message);
    return true;
  }
}

function renderizarPerfil(data) {
  const avatar = document.getElementById('headerAvatar');
  const handleEl = document.getElementById('headerHandle');
  const sloganWrap = document.getElementById('headerSloganWrap');
  const sloganEl = document.getElementById('headerSlogan');

  if (avatar) {
    avatar.src = data.foto_perfil
      ? `${API_BASE_URL}${data.foto_perfil}`
      : DEFAULT_AVATAR;
    avatar.alt = 'Foto de RAMOS SOMAR, pré-candidato a Deputado Estadual';
  }

  if (handleEl && data.nome_usuario) {
    const handle = data.nome_usuario.trim();
    handleEl.textContent = handle.startsWith('@') ? handle : `@${handle}`;
    handleEl.hidden = false;
  }

  if (sloganWrap && sloganEl && data.descricao) {
    sloganEl.textContent = data.descricao;
  }
}

function renderizarItens(itens) {
  const nav = document.getElementById('linksNav');
  if (!nav) return;

  if (itens.length === 0) {
    nav.innerHTML = '<p class="links__empty">Nenhum link disponível no momento.</p>';
    return;
  }

  nav.innerHTML = itens.map((item) => {
    const platform = (item.icone || 'OUTROS').toLowerCase();
    const iconSvg = getIcon(item.icone);

    return `
      <a
        href="${escapeAttr(item.url)}"
        class="links__item"
        target="_blank"
        rel="noopener noreferrer"
        data-platform="${escapeAttr(platform)}"
      >
        <span class="links__icon-wrap" aria-hidden="true">
          <span class="links__icon">${iconSvg}</span>
        </span>
        <span class="links__text">${escapeHtml(item.titulo)}</span>
        <span class="links__arrow" aria-hidden="true">→</span>
      </a>
    `;
  }).join('');
}

function mostrarLoading(show) {
  const loadingEl = document.getElementById('biolinkLoading');
  if (loadingEl) {
    loadingEl.hidden = !show;
  }
}

function mostrarErro(message) {
  const errorEl = document.getElementById('biolinkError');
  if (!errorEl) return;

  if (message === false || !message) {
    errorEl.hidden = true;
    errorEl.textContent = '';
    return;
  }

  errorEl.textContent = message;
  errorEl.hidden = false;
}

function mostrarConteudo(show) {
  const pageEl = document.querySelector('.page');
  if (pageEl) {
    pageEl.hidden = !show;
  }
}

function mostrarNotFound(show) {
  const notFoundEl = document.getElementById('biolinkNotFound');
  if (!notFoundEl) return;

  document.body.classList.toggle('is-not-found', show);
  notFoundEl.hidden = !show;
  document.title = show ? '404 — BioLink não encontrado' : PAGE_TITLE;
}

function initNotFoundRetry() {
  const retryBtn = document.getElementById('biolinkNotFoundRetry');
  if (!retryBtn || retryBtn.dataset.bound) return;

  retryBtn.dataset.bound = 'true';
  retryBtn.addEventListener('click', () => {
    carregarBioLink();
  });
}

document.addEventListener('DOMContentLoaded', initNotFoundRetry);

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
