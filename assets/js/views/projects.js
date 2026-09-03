import { getProjects } from '../data.js';
import { icons } from '../icons.js';

export async function renderProjectsList() {
  const projects = await getProjects();
  const rows = projects
    .map(
      (p) => `
      <li class="dir-entry">
        <a href="#/projetos/${p.slug}">
          <span class="dir-perm">drwxr-xr-x</span>
          <span class="dir-name">${p.title}/</span>
          <span class="dir-summary">${p.summary}</span>
        </a>
      </li>`
    )
    .join('');

  return `
    <section class="view">
      <h2 class="section-title">$ ls projetos/</h2>
      <p>Meus principais projetos, envolvendo diferentes tecnologias para diferentes propósitos.</p>
      <ul class="dir-listing">${rows}</ul>
    </section>`;
}

export async function renderProjectDetail({ slug }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return `
      <section class="view">
        <p class="breadcrumb"><a href="#/projetos">$ cd ..</a></p>
        <p class="output output-error">projeto "${slug}" não encontrado.</p>
      </section>`;
  }

  const tags = project.tech.map((t) => `<li class="tag">${t}</li>`).join('');
  const demo = project.links.demo
    ? `<a class="btn btn-ghost" href="${project.links.demo}" target="_blank" rel="noopener noreferrer">${icons.externalLink} demo</a>`
    : '';
  const repo = project.links.repo
    ? `<a class="btn btn-ghost" href="${project.links.repo}" target="_blank" rel="noopener noreferrer">${icons.externalLink} repositório</a>`
    : '';

  return `
    <section class="view">
      <p class="breadcrumb"><a href="#/projetos">$ cd ..</a></p>
      <h2 class="section-title">$ cat projetos/${project.slug}.md</h2>
      <div class="term-window">
        <div class="term-body detail-body">
          <img class="detail-image" src="${project.image}" alt="${project.title}">
          <div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul class="tag-list">${tags}</ul>
            <div class="detail-actions">${demo}${repo}</div>
          </div>
        </div>
      </div>
    </section>`;
}
