// Router client-side por hash — sem dependências (ver docs/adr/0001).
// Cada rota é registrada com `route(path, handler)`. `handler` recebe os
// parâmetros de slug e retorna uma string HTML, ou uma Promise de
// `{ html, onMount }` quando a view precisa ligar comportamento (formulário,
// por exemplo) depois de inserida no DOM.

const routes = [];

function compilePath(path) {
  const paramNames = [];
  const segment = path
    .split('/')
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith(':')) {
        paramNames.push(part.slice(1));
        return '([^/]+)';
      }
      return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return { regex: new RegExp(`^/${segment}/?$`), paramNames };
}

export function route(path, handler) {
  const { regex, paramNames } = compilePath(path);
  routes.push({ regex, paramNames, handler });
}

function currentPath() {
  const hash = location.hash.replace(/^#/, '');
  return hash || '/inicio';
}

function notFoundHtml(path) {
  return `
    <section class="view">
      <div class="term-window">
        <div class="term-titlebar">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="term-title">josemar@portfolio: ~</span>
        </div>
        <div class="term-body">
          <p class="prompt">$ cd ${path}</p>
          <p class="output output-error">bash: cd: rota não encontrada</p>
          <p><a href="#/inicio">$ cd ~</a></p>
        </div>
      </div>
    </section>`;
}

function errorHtml(path, error) {
  console.error(error);
  return `
    <section class="view">
      <div class="term-window">
        <div class="term-body">
          <p class="prompt">$ cd ${path}</p>
          <p class="output output-error">erro ao carregar esta seção. tente recarregar a página.</p>
        </div>
      </div>
    </section>`;
}

export async function renderRoute(outlet) {
  const path = currentPath();
  const match = routes.find((r) => r.regex.test(path));

  if (!match) {
    outlet.innerHTML = notFoundHtml(path);
    return path;
  }

  const params = {};
  const groups = path.match(match.regex);
  match.paramNames.forEach((name, i) => (params[name] = decodeURIComponent(groups[i + 1])));

  try {
    const result = await match.handler(params);
    if (result && typeof result === 'object' && 'html' in result) {
      outlet.innerHTML = result.html;
      if (typeof result.onMount === 'function') result.onMount(outlet);
    } else {
      outlet.innerHTML = result;
    }
  } catch (error) {
    outlet.innerHTML = errorHtml(path, error);
  }

  return path;
}

export function startRouter(outlet, onRender) {
  const handle = async () => {
    const path = await renderRoute(outlet);
    if (onRender) onRender(path);
  };
  window.addEventListener('hashchange', handle);
  handle();
}
