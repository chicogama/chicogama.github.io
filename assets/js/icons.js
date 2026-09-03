// Ícones de linha, autorais, minimalistas — só para ações funcionais.
// Nada de pacote de ícones externo (ver docs/adr/0002).

function svg(inner) {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
}

export const icons = {
  menu: svg('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'),
  close: svg('<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>'),
  download: svg('<path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><path d="M5 20h14"/>'),
  externalLink: svg('<path d="M14 4h6v6"/><line x1="10" y1="14" x2="20" y2="4"/><path d="M20 14v6H4V4h6"/>'),
  arrowRight: svg('<line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/>'),
  send: svg('<line x1="21" y1="3" x2="10" y2="14"/><polygon points="21 3 14 21 10 14 3 10 21 3"/>'),
};
