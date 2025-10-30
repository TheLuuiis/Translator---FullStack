'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const sourceLang = document.getElementById("sourceLang");
  const targetLang = document.getElementById("targetLang");

  let timeoutId;

  async function translateText(text, source, target) {
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

      if (!response.ok) throw new Error("Error en la API de traducción");

      const data = await response.json();
      outputText.value = data.translatedText || "No se pudo obtener la traducción.";
    } catch (err) {
      outputText.value = "Error al conectar con la API.";
      console.error(err);
    }
  }

  inputText.addEventListener("input", () => {
    const text = inputText.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      translateText(text, source, target);
    }, 100);
  });

swapLangs.addEventListener("click", () => {
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;

  
  const text = outputText.value.trim(); 
  if (text) {
    translateText(text, sourceLang.value, targetLang.value).then(() => {
      inputText.value = text;
    });
  }
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
  const microfone = document.querySelector('.microfone');

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

      microfone.style.fill = '#fff';

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
        texts.style.color = '#9e9e9e';
      });

      moon.style.display = 'block';
      moon.style.color = '#1a1a1a';
      sun.style.display = 'none';

      icons.forEach(icon => {
        icon.style.color = '#9e9e9e';
      });

      arrow.style.fill = '#9e9e9e';

      microfone.style.fill = '#9e9e9e';

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

      options.forEach(option => {
        option.style.color = '#9e9e9e';
        option.style.background = 'rgba(255, 255, 255, 0.9)'
      });
    }
  }

  moon.addEventListener('click', toggleTheme);
  sun.addEventListener('click', toggleTheme);

  if (!microfone) return; 

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    microfone.style.display = 'none';
    console.warn('SpeechRecognition no soportado en este navegador.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.lang = 'es-ES'; 

  let listening = false;

  function updateMicUI(listening) {
    if (listening) {
      microfone.style.fill = '#ff4b4b';
      microfone.classList.add('listening');
    } else {
      microfone.style.fill = isDark ? '#fff' : '#9e9e9e';
      microfone.classList.remove('listening');
    }
  }

  microfone.addEventListener('click', () => {
    const src = sourceLang.value;
    if (src && src !== 'auto') {
      const map = { es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN' };
      recognition.lang = map[src] || src;
    }

    if (listening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.error('Error al iniciar reconocimiento:', err);
      }
    }
  });

  recognition.onstart = () => {
    listening = true;
    updateMicUI(true);
  };

  recognition.onend = () => {
    listening = false;
    updateMicUI(false);
  };

  recognition.onerror = (event) => {
    console.error('SpeechRecognition error', event);
    listening = false;
    updateMicUI(false);
  };

  recognition.onresult = (event) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      if (result.isFinal) final += transcript;
      else interim += transcript;
    }

    const shown = (final || interim).trim();
    inputText.value = shown;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const source = sourceLang.value;
      const target = targetLang.value;
      translateText(shown, source, target);
    }, 100);
  };

});