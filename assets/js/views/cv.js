import { getCV } from '../data.js';
import { icons } from '../icons.js';

export async function renderCV() {
  const cv = await getCV();

  const skills = cv.summary.skills.map((s) => `<li class="tag">${s}</li>`).join('');
  const education = cv.education
    .map(
      (e) => `
      <li>
        <span class="dir-perm">-rw-r--r--</span>
        <span class="dir-name">${e.title}</span>
        <span class="dir-summary">${e.org} · ${e.period}</span>
      </li>`
    )
    .join('');
  const experience = cv.experience
    .map(
      (job) => `
      <li>
        <span class="dir-name">${job.title}</span>
        <span class="dir-summary">${job.org}${job.period ? ' · ' + job.period : ''}</span>
        <p>${job.description}</p>
      </li>`
    )
    .join('');

  return `
    <section class="view">
      <h2 class="section-title">$ cat curriculo.md</h2>
      <div class="term-window">
        <div class="term-body">
          <h3>${cv.summary.name}</h3>
          <p class="role">${cv.summary.role}</p>

          <p class="prompt">$ ls habilidades/</p>
          <ul class="tag-list">${skills}</ul>

          <p class="prompt">$ ls formacao/</p>
          <ul class="dir-listing dir-entry">${education}</ul>

          <p class="prompt">$ cat atuacao.log</p>
          <ul class="timeline">${experience}</ul>

          <div class="hero-actions">
            <a class="btn" href="${cv.download}" download>${icons.download} download cv (pdf)</a>
          </div>
        </div>
      </div>
    </section>`;
}
