console.log("teste funcionamento Js");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const botoesModelos = document.querySelectorAll(".btn-modelo, .botao-carro");

  // ========= FORMULÁRIO =========
  if (form) {
    const inputs = form.querySelectorAll("input, textarea, select");

    // Carrega dados salvos do localStorage
    inputs.forEach(input => {
      const saved = localStorage.getItem(input.name);
      if (saved) input.value = saved;
    });

    // Salva enquanto digita
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        localStorage.setItem(input.name, input.value);
      });
    });

    // Validação e confirmação
    form.addEventListener("submit", (e) => {
      let valido = true;

      inputs.forEach(input => {
        if (input.hasAttribute("required") && input.value.trim() === "") {
          valido = false;
          input.classList.add("input-erro");
        } else {
          input.classList.remove("input-erro");
        }
      });

      if (!valido) {
        e.preventDefault();
        alert("Preencha todos os campos obrigatórios antes de enviar");
        return;
      }

      const confirmar = confirm("Tem certeza que deseja enviar o formulário?");
      if (!confirmar) {
        e.preventDefault();
      } else {
        alert("✅ Formulário enviado com sucesso!");
        localStorage.clear();
      }
    });
  }

  // ========= SOM DE MOTOR =========
  if (botoesModelos.length > 0) {
    const audio = new Audio("../assets/motor.mp3");
    botoesModelos.forEach(btn => {
      btn.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });
    });
  }

  // ========= LOADER / PRÉ-CARREGAMENTO =========
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `<div class="carregando"><img src="./img/whitecar.png" alt="Carregando"></div>`;
  document.body.appendChild(loader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("oculto");
      setTimeout(() => loader.remove(), 600);
    }, 1000);
  });
});