document.addEventListener("DOMContentLoaded", () => {
  console.log("JS carregado com sucesso!");

  // ===== Loader Inicial =====
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `
    <div class="loader-content">
      <img src="./img/whitecar.png" alt="Carregando..." class="loader-logo">
      <div class="loader-glow"></div>
    </div>
  `;
  document.body.appendChild(loader);

  // Som suave de motor (opcional)
  const audio = new Audio("./motor.mp3");
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

  // ===== Exemplo de uso =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.querySelector("#nome");
      const email = form.querySelector("#email");

      if (!nome.value) {
        showNotification("⚠️ Preencha o nome!", "error");
        return;
      }
      if (!email.value.includes("@")) {
        showNotification("📧 Email inválido!", "error");
        return;
      }

      showNotification("✅ Formulário enviado com sucesso!", "success");
      form.reset();
    });
  }
});