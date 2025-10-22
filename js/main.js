console.log("teste funcionamento Js");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    const inputs = form.querySelectorAll("input, textarea, select");

    // Carrega dados salvos
    inputs.forEach((input) => {
      const saved = localStorage.getItem(input.name);
      if (saved) input.value = saved;
    });

    // Salva conforme digita
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        localStorage.setItem(input.name, input.value);
      });
    });

    // Validação + confirmação
    form.addEventListener("submit", (e) => {
      let valid = true;
      inputs.forEach((input) => {
        if (input.hasAttribute("required") && input.value.trim() === "") {
          valid = false;
          input.style.border = "2px solid red";
        } else {
          input.style.border = "";
        }
      });

      if (!valid) {
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

  
  // ===============================
  // SOM DE MOTOR AO CLICAR EM MODELO
  // ===============================
  const botoesModelos = document.querySelectorAll(".btn-modelo, .botao-carro");
  if (botoesModelos.length > 0) {
    const audio = new Audio("../assets/motor.mp3"); // coloca um som curto aqui
    botoesModelos.forEach((btn) => {
      btn.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
      });
    });
  }


  // ===============================
  // ANIMAÇÃO DE ENTRADA (pré-carregamento)
  // ===============================
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `<div class="carregando"> <img src="./img/logo.png"></div>`;
  loader.style.position = "fixed";
  loader.style.top = 0;
  loader.style.left = 0;
  loader.style.width = "100%";
  loader.style.height = "100%";
  loader.style.background = "#111";
  loader.style.color = "#fff";
  loader.style.display = "flex";
  loader.style.alignItems = "center";
  loader.style.justifyContent = "center";
  loader.style.fontSize = "24px";
  loader.style.zIndex = "9999";
  document.body.appendChild(loader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.6s ease";
      setTimeout(() => loader.remove(), 600);
    }, 1000);
  });
});