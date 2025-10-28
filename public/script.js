'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const sourceLang = document.getElementById("sourceLang");
  const targetLang = document.getElementById("targetLang");

  let timeoutId;

  // Detecta cambios en el campo de entrada
  inputText.addEventListener("input", () => {
    const text = inputText.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    // Cancela cualquier solicitud anterior si el usuario sigue escribiendo
    clearTimeout(timeoutId);

    // Espera 300ms después de que el usuario deje de escribir para enviar la solicitud
    timeoutId = setTimeout(async () => {
      if (!text) {
        outputText.value = ""; // Limpia el campo de salida si no hay texto
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
    }, 300); // Ajusta el tiempo de espera según sea necesario
  });
});