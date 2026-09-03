import { route, redirect, startRouter } from './router.js';
import { renderHome } from './views/home.js';
import { renderProjectsList, renderProjectDetail } from './views/projects.js';
import { renderStudiesList, renderStudyDetail } from './views/studies.js';
import { renderCV } from './views/cv.js';
import { renderContact } from './views/contact.js';

route('/inicio', renderHome);
route('/projetos', renderProjectsList);
route('/projetos/:slug', renderProjectDetail);
route('/estudos', renderStudiesList);
route('/estudos/:slug', renderStudyDetail);
route('/curriculo', renderCV);
route('/contato', renderContact);

// Sobre virou parte de Início; Formação e Atuação viraram seções dentro
// de Currículo (mesmos dados, ver assets/js/views/cv.js) — mantidos como
// redirecionamento para não quebrar um link antigo.
redirect('/sobre', '#/inicio');
redirect('/formacao', '#/curriculo');
redirect('/atuacao', '#/curriculo');

const outlet = document.getElementById('main-content');
const navLinks = Array.from(document.querySelectorAll('[data-route]'));
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function updateActiveNav(path) {
  const base = '/' + path.split('/').filter(Boolean)[0];
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.route === base);
  });
}

function onRender(path) {
  updateActiveNav(path);
  outlet.focus({ preventScroll: false });
  window.scrollTo(0, 0);
}

startRouter(outlet, onRender);
