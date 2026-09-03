import { getStudies } from '../data.js';

export async function renderStudiesList() {
  const studies = await getStudies();
  const rows = studies
    .map(
      (s) => `
      <li class="dir-entry">
        <a href="#/estudos/${s.slug}">
          <span class="dir-perm">-rw-r--r--</span>
          <span class="dir-name">${s.title}.md</span>
          <span class="dir-summary">${s.summary}</span>
        </a>
      </li>`
    )
    .join('');

  return `
    <section class="view">
      <h2 class="section-title">$ ls estudos/</h2>
      <p>Notas curtas sobre tecnologias que venho estudando.</p>
      <ul class="dir-listing">${rows}</ul>
    </section>`;
}

export async function renderStudyDetail({ slug }) {
  const studies = await getStudies();
  const study = studies.find((s) => s.slug === slug);

  if (!study) {
    return `
      <section class="view">
        <p class="breadcrumb"><a href="#/estudos">$ cd ..</a></p>
        <p class="output output-error">estudo "${slug}" não encontrado.</p>
      </section>`;
  }

  return `
    <section class="view">
      <p class="breadcrumb"><a href="#/estudos">$ cd ..</a></p>
      <h2 class="section-title">$ cat estudos/${study.slug}.md</h2>
      <div class="term-window">
        <div class="term-body detail-body">
          <img class="detail-image" src="${study.image}" alt="${study.title}">
          <div>
            <h3>${study.title}</h3>
            <p>${study.description}</p>
            <div class="video-wrapper">
              <iframe src="${study.video}" title="Vídeo sobre ${study.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
