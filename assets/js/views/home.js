import { icons } from '../icons.js';

// Início e Sobre viviam como duas páginas curtas — juntas aqui como uma
// única sessão de terminal (`whoami` seguido de `cat sobre.md`), o que dá
// à página inicial conteúdo suficiente para não parecer vazia.
export async function renderHome() {
  return `
    <section class="view view-home">
      <div class="term-window">
        <div class="term-titlebar">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="term-title">josemar@portfolio: ~</span>
        </div>
        <div class="term-body">
          <div class="hero-body">
            <img class="avatar" src="./assets/img/perfil.jpg" alt="Foto de Josemar Ferreira Gama">
            <div class="hero-text">
              <p class="prompt">$ whoami</p>
              <h1>Josemar Ferreira Gama<span class="cursor">▍</span></h1>
              <p class="role">Desenvolvedor Web</p>
              <div class="hero-actions">
                <a class="btn" href="./assets/docs/Josemar Gama Curriculum Vitae.pdf" download>${icons.download} download cv</a>
                <a class="btn btn-ghost" href="#/curriculo">${icons.arrowRight} ver currículo</a>
              </div>
              <ul class="social-tags">
                <li><a href="https://github.com/chicogama" target="_blank" rel="noopener noreferrer">--github</a></li>
                <li><a href="https://www.linkedin.com/in/josemar-gama/" target="_blank" rel="noopener noreferrer">--linkedin</a></li>
                <li><a href="https://www.instagram.com/chicogama.sh/" target="_blank" rel="noopener noreferrer">--instagram</a></li>
              </ul>
            </div>
          </div>

          <hr class="term-rule">

          <p class="prompt">$ cat sobre.md</p>
          <p>Sou Desenvolvedor de aplicativos para Web. Tenho 27 anos, natural do Pará e atualmente morando em Macapá-AP. Sou entusiasta em tecnologia e desenvolvimento, com paixão por games e eSports.</p>

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
