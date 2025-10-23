document.addEventListener("DOMContentLoaded", () => {
  console.log("Teste Retorno Js");

  // ===== Loader Inicial =====
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `
    <div class="loader-content">
      <img src="../img/whitecar.png" alt="Carregando..." class="loader-logo">
      <div class="loader-glow"></div>
    </div>
  `;
  document.body.appendChild(loader);

  const audio = new Audio("img/motor.mp3");
  audio.volume = 0.4;

  window.addEventListener("load", () => {
    setTimeout(() => {
      audio.play().catch(() => {});
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 1200);
    }, 1200);
  });

  // ===== Sistema de Notificações =====
  const notifyContainer = document.createElement("div");
  notifyContainer.classList.add("notify-container");
  document.body.appendChild(notifyContainer);

  function showNotification(message, type = "info") {
    const notif = document.createElement("div");
    notif.classList.add("notification", type);
    notif.textContent = message;

    notifyContainer.appendChild(notif);

    setTimeout(() => {
      notif.classList.add("fade-out");
      setTimeout(() => notif.remove(), 500);
    }, 3000);
  }

  // ===== Validação do formulário =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.querySelector("input[name='name']");
      const email = form.querySelector("input[name='email']");
      const data = form.querySelector("input[name='subject']");
      const mensagem = form.querySelector("textarea[name='message']");

      if (!nome.value.trim()) {
        showNotification("⚠️ Preencha o nome!", "error");
        return;
      }
      if (!email.value.includes("@")) {
        showNotification("📧 Email inválido!", "error");
        return;
      }
      if (!data.value) {
        showNotification("📅 Escolha uma data!", "error");
        return;
      }
      if (!mensagem.value.trim()) {
        showNotification("✏️ Adicione uma observação!", "error");
        return;
      }

      // Se passou em todas as validações
      showNotification("✅ Formulário enviado com sucesso!", "success");

      // Redireciona pra resposta.html
      setTimeout(() => {
        window.location.href = "resposta.html"; // Caminho relativo correto
      }, 800);

      form.reset();
    });
  }
});