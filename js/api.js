/**
 * Camada de comunicação com a API pública de BioLink.
 * Documentação: BIOLINK_PUBLICO_API.md
 */

function getSiteId() {
  return SITE_ID;
}

async function buscarDados(siteId) {
  const url = `${API_BASE_URL}/api/v1/biolinks/publico?site_id=${siteId}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('CONNECTION_ERROR');
  }

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('API_ERROR');
  }

  return response.json();
}
