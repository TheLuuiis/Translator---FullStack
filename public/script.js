'use strict'
// <    >  =>

document.addEventListener('DOMContentLoaded', () => {

const translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;
  const output = document.getElementById("outputText");

  if (!text) {
    output.value = "Escribe algo para traducir.";
    return;
  }

  output.value = "raduciendo...";

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target }),
    });

    const data = await response.json();

    if (data.translatedText) {
      output.value = data.translatedText;
    } else {
      output.value = "Error al traducir.";
    }
  } catch (error) {
    output.value = "Error de conexión con el servidor.";
  }
});














































  VANTA.BIRDS({
    el: "#vanta-bg", 
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0xbebeff
  });
});