let imagemBase64 = '';

document.addEventListener("DOMContentLoaded", function () {
  const imagemUpload = document.getElementById('imagemUpload');
  if (imagemUpload) {
    imagemUpload.addEventListener('change', function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        imagemBase64 = e.target.result;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }
});

function iniciarPagamento() {
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const whatsapp = document.getElementById('whatsapp').value;

  if (!titulo || !descricao || !whatsapp) {
    alert('Preencha todos os campos antes de continuar.');
    return;
  }

  localStorage.setItem('titulo', titulo);
  localStorage.setItem('descricao', descricao);
  localStorage.setItem('whatsapp', whatsapp);
  localStorage.setItem('imagem', imagemBase64);

  document.getElementById('form-container').style.display = 'none';
  document.getElementById('pagamento-container').style.display = 'block';
}

function confirmarPagamento() {
  document.getElementById('pagamento-container').style.display = 'none';
  document.getElementById('confirmacao-container').style.display = 'block';

  setTimeout(() => {
    liberarAnuncio();
  }, 5000);
}

function liberarAnuncio() {
  const titulo = localStorage.getItem('titulo');
  const descricao = localStorage.getItem('descricao');
  const whatsapp = localStorage.getItem('whatsapp');
  const imagem = localStorage.getItem('imagem');

  const linkWhatsApp = `https://wa.me/${whatsapp}?text=${encodeURIComponent(titulo + '\n' + descricao)}`;

  let html = `<h3>${titulo}</h3>`;
  if (imagem) html += `<img src="${imagem}" alt="Imagem" style="width:100%; max-height:300px; object-fit:cover; margin-top:10px;">`;
  html += `<p>${descricao}</p>`;
  html += `<a href="${linkWhatsApp}" target="_blank">📲 Falar no WhatsApp</a>`;
  html += `<br><br><button onclick="copiarTexto()">📋 Copiar Anúncio</button>`;

  document.getElementById('confirmacao-container').style.display = 'none';
  document.getElementById('anuncio-container').style.display = 'block';
  document.getElementById('preview').innerHTML = html;
}

function copiarTexto() {
  const el = document.createElement('textarea');
  el.value = document.getElementById('preview').innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('Anúncio copiado para a área de transferência!');
}
