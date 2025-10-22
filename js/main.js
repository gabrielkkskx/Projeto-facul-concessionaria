document.addEventListener("DOMContentLoaded", () => {
  console.log("tesye retorno Js");

// Loader inicial
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `
    <div class="loader-content">
      <img src="./img/whitecar.png" alt="Carregando..." class="loader-logo">
      <div class="loader-glow"></div>
    </div>
  `;
  document.body.appendChild(loader);

  // Som suave de motor
  const audio = new Audio("./motor.mp3"); //ainda preciso adicionar algum som
  audio.volume = 0.4;

  // Quando tudo carregar
  window.addEventListener("load", () => {
    setTimeout(() => {
      audio.play().catch(() => {}); // ignora bloqueio automático do navegador
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 1200);
    }, 1200);
  });
});