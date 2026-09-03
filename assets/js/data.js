// Camada de dados: busca os JSON mockados em tempo de execução.
// Trocar por uma API real depois é trocar só esta função, não os templates
// (ver docs/adr/0003-json-fetch-mock-data-seam.md).

const cache = new Map();

async function loadJSON(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Falha ao carregar ${path}: HTTP ${response.status}`);
  }
  const json = await response.json();
  cache.set(path, json);
  return json;
}

export const getProjects = () => loadJSON('./data/projects.json');
export const getStudies = () => loadJSON('./data/studies.json');
export const getCV = () => loadJSON('./data/cv.json');
