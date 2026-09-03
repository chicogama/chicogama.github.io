import { getCV } from '../data.js';

export async function renderEducation() {
  const cv = await getCV();
  const rows = cv.education
    .map(
      (e) => `
      <li>
        <a href="#/curriculo">
          <span class="dir-perm">-rw-r--r--</span>
          <span class="dir-name">${e.title}</span>
          <span class="dir-summary">${e.org} · ${e.period}</span>
        </a>
      </li>`
    )
    .join('');

  return `
    <section class="view">
      <h2 class="section-title">$ ls formacao/</h2>
      <p>Cursos realizados durante minhas jornadas de estudo em tecnologia.</p>
      <ul class="dir-listing dir-entry">${rows}</ul>
    </section>`;
}
