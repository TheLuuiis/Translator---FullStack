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
  const options = document.querySelectorAll('.options');
  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
      darkMode.style.background = '#292929';

      text.forEach(texts => {
        texts.style.color = '#fff';
      });

      moon.style.display = 'none';
      sun.style.display = 'block';
      sun.style.color = '#fff';

      icons.forEach(icon => {
        icon.style.color = '#fff';
      });
      
      arrow.style.fill = '#fff';

      texTarea.forEach(campus => {
        campus.style.color = '#fff';
        campus.style.background = '#292929';
        campus.style.boxShadow = `
            0 5px 25px rgba(0, 0, 0, 0.8),
            0 8px 20px rgba(255, 255, 255, 0.05)
          `;
      });

      options.forEach(option => {
        option.style.color = '#fff';
        option.style.background = 'rgba(41, 41, 41, 0.9)'
      });

      left.forEach(textBlue => {
        textBlue.style.color = '#99c3ff';
        textBlue.style.border = 'none'
      });

      let style = document.getElementById('placeholderStyle');
      if (!style) {
        style = document.createElement('style');
        style.id = 'placeholderStyle';
        document.head.appendChild(style);
      }
      style.textContent = `
        .content-left::placeholder {
          color: #9e9e9e;
          opacity: 0.8;
        }
      `;
    } else {
      darkMode.style.background = '#fff';

      text.forEach(texts => {
        texts.style.color = '#000';
      });

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
          color: #9e9e9e;
          opacity: 1;
        }
      `;
    }
  }

  moon.addEventListener('click', toggleTheme);
  sun.addEventListener('click', toggleTheme);

});
