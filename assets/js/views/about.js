export async function renderAbout() {
  return `
    <section class="view">
      <h2 class="section-title">$ cat sobre.md</h2>
      <div class="term-window">
        <div class="term-body">
          <p>Me chamo Josemar Ferreira Gama, sou Desenvolvedor de aplicativos para Web.</p>
          <p>Tenho 27 anos de idade, natural do Pará e atualmente morando em Macapá-AP. Sou entusiasta em tecnologia e desenvolvimento, com paixão por games e eSports.</p>
          <p class="prompt">$ ls habilidades/</p>
          <ul class="tag-list">
            <li class="tag">html5</li>
            <li class="tag">css3</li>
            <li class="tag">javascript</li>
            <li class="tag">angular</li>
          </ul>
        </div>
      </div>
    </section>`;
}
