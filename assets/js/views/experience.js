import { getCV } from '../data.js';

export async function renderExperience() {
  const cv = await getCV();
  const rows = cv.experience
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
      <h2 class="section-title">$ cat atuacao.log</h2>
      <p>Minha experiência profissional atuando na área de tecnologia.</p>
      <ul class="timeline">${rows}</ul>
    </section>`;
}
