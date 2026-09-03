import { icons } from '../icons.js';

const STORAGE_KEY = 'chicogama.mensagens';

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveMessage(message) {
  const messages = loadMessages();
  messages.push({ id: Date.now(), ...message });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // localStorage indisponível (modo privado, quota) — segue sem persistir
  }
  return messages.length;
}

export async function renderContact() {
  const html = `
    <section class="view">
      <h2 class="section-title">$ mail --compose</h2>
      <div class="term-window">
        <div class="term-body">
          <ul class="contact-list">
            <li>tel: +55 (96) 99127-7292</li>
            <li>email: josemargamadev@gmail.com</li>
            <li><a href="https://github.com/chicogama" target="_blank" rel="noopener noreferrer">--github /chicogama</a></li>
            <li><a href="https://www.linkedin.com/in/josemar-gama/" target="_blank" rel="noopener noreferrer">--linkedin /josemar-gama</a></li>
            <li><a href="https://www.instagram.com/chicogama.sh/" target="_blank" rel="noopener noreferrer">--instagram @chicogama.sh</a></li>
          </ul>

          <p>Alguma pergunta ou sugestão? Use o formulário abaixo.</p>

          <form id="contact-form" novalidate>
            <label for="contact-name">nome</label>
            <input id="contact-name" name="name" type="text" autocomplete="name" required>

            <label for="contact-email">email</label>
            <input id="contact-email" name="email" type="email" autocomplete="email" required>

            <label for="contact-message">mensagem</label>
            <textarea id="contact-message" name="message" rows="4" required></textarea>

            <button type="submit" class="btn">${icons.send} enviar</button>
            <p id="contact-output" class="output" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>`;

  function onMount(root) {
    const form = root.querySelector('#contact-form');
    const output = root.querySelector('#contact-output');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name || !data.email || !data.message) {
        output.textContent = '> erro: preencha nome, email e mensagem';
        output.className = 'output output-error';
        return;
      }

      const total = saveMessage(data);
      output.textContent = `> mensagem registrada com sucesso (${total} no total neste navegador)`;
      output.className = 'output output-success';
      form.reset();
    });
  }

  return { html, onMount };
}
