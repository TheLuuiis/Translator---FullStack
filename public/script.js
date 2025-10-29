'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const sourceLang = document.getElementById("sourceLang");
  const targetLang = document.getElementById("targetLang");

  let timeoutId;

  inputText.addEventListener("input", () => {
    const text = inputText.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      if (!text) {
        outputText.value = ""; 
        return;
      }

      outputText.value = "Traduciendo...";

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, source, target }),
        });

        if (!response.ok) {
          throw new Error("Error en la API de traducción");
        }

        const data = await response.json();

        if (data.translatedText) {
          outputText.value = data.translatedText;
        } else {
          outputText.value = "No se pudo obtener la traducción.";
        }
      } catch (error) {
        outputText.value = "Error al conectar con la API.";
        console.error(error);
      }
    }, 200); 
  });

  /* Dark - Theme */
  const darkMode = document.querySelector('.darkMode');
  const text = document.querySelectorAll('.text');
  const moon = document.querySelector('.moon');
  const sun = document.querySelector('.sun');
  const icons = document.querySelectorAll('.bx');
  const arrow = document.querySelector('.arrow');
  const texTarea = document.querySelectorAll('.content-left');
  const left = document.querySelectorAll('.left');

  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
      // 🌙 Tema oscuro
      darkMode.style.background = '#1a1a1a';

      text.forEach(texts => {
        texts.style.color = '#fff';
      });

      // Quitamos y mostramos el icono 
      moon.style.display = 'none';
      sun.style.display = 'block';
      sun.style.color = '#fff';

      icons.forEach(icon => {
        icon.style.color = '#fff';
      });
      
      arrow.style.fill = '#fff';

      texTarea.forEach(campus => {
        campus.style.color = '#fff';
        campus.style.background = '#1a1a1a';
        campus.style.boxShadow = `
            0 5px 25px rgba(0, 0, 0, 0.8),
            0 8px 20px rgba(255, 255, 255, 0.05)
          `;
      });

      let style = document.getElementById('placeholderStyle');
      if (!style) {
        style = document.createElement('style');
        style.id = 'placeholderStyle';
        document.head.appendChild(style);
      }
      style.textContent = `
        .content-left::placeholder {
          color: #fff;
          opacity: 0.9;
        }
      `;
    } else {
      // ☀️ Tema claro (revertir todos los cambios)
      darkMode.style.background = '#fff';

      text.forEach(texts => {
        texts.style.color = '#000';
      });

      // Quitamos y mostramos el icono 
      moon.style.display = 'block';
      sun.style.display = 'none';
      moon.style.color = '#000';

      icons.forEach(icon => {
        icon.style.color = '#000';
      });

      arrow.style.fill = '#000';

      texTarea.forEach(campus => {
        campus.style.color = '#5F6368';
        campus.style.background = 'rgba(255, 255, 255, 0.1)';
        campus.style.boxShadow = `
          0 5px 25px rgba(255, 255, 255, 0.7),
          0 8px 20px rgba(0, 0, 0, 0.4)
          `;
      });


      left.forEach(textBlue => {
        textBlue.style.color = '#0866ff';
      });

      let style = document.getElementById('placeholderStyle');
      if (!style) {
        style = document.createElement('style');
        style.id = 'placeholderStyle';
        document.head.appendChild(style);
      }
      style.textContent = `
        .content-left::placeholder {
          color: #5F6368;
          opacity: 1;
        }
      `;
    }
  }

  // 👇 Escuchamos ambos iconos
  moon.addEventListener('click', toggleTheme);
  sun.addEventListener('click', toggleTheme);

});
