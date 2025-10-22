console.log("Funcionou")
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
        alert("⚠️ Preenche todos os campos obrigatórios antes de enviar, pia!");
        return;
      }

      const confirmar = confirm("Tem certeza que quer enviar o formulário?");
      if (!confirmar) {
        e.preventDefault();
      } else {
        alert("✅ Formulário enviado com sucesso!");
        localStorage.clear();
      }
    });
  }

  // ===============================
  // BOTÃO VOLTAR AO TOPO
  // ===============================
  const btnTopo = document.createElement("button");
  btnTopo.textContent = "⬆️ Topo";
  btnTopo.id = "btnTopo";
  btnTopo.style.position = "fixed";
  btnTopo.style.bottom = "20px";
  btnTopo.style.right = "20px";
  btnTopo.style.padding = "10px 15px";
  btnTopo.style.borderRadius = "10px";
  btnTopo.style.border = "none";
  btnTopo.style.cursor = "pointer";
  btnTopo.style.display = "none";
  btnTopo.style.zIndex = "1000";
  document.body.appendChild(btnTopo);

  window.addEventListener("scroll", () => {
    btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===============================
  // MODO ESCURO/CLARO
  // ===============================
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙 Modo Escuro";
  toggleBtn.id = "modoBtn";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "20px";
  toggleBtn.style.right = "20px";
  toggleBtn.style.padding = "10px";
  toggleBtn.style.borderRadius = "10px";
  toggleBtn.style.border = "none";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.zIndex = "1000";
  document.body.appendChild(toggleBtn);

  const body = document.body;
  const modoSalvo = localStorage.getItem("modo");
  if (modoSalvo === "escuro") {
    body.classList.add("escuro");
    toggleBtn.textContent = "☀️ Modo Claro";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("escuro");
    const escuro = body.classList.contains("escuro");
    localStorage.setItem("modo", escuro ? "escuro" : "claro");
    toggleBtn.textContent = escuro ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  });

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
  loader.innerHTML = `<div class="carregando">🚗💨 Carregando...</div>`;
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

// ===============================
// MELHORAR WOW.js (opcional)
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const animados = document.querySelectorAll(".wow");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated");
        }
      });
    },
    { threshold: 0.2 }
  );

  animados.forEach((el) => observer.observe(el));
});
