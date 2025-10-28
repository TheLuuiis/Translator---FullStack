'use strict'
// <    >  =>

import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/translate", async (req, res) => {
  const { text, source, target } = req.body;

  if (!text || !source || !target) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const apiUrl = `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error en la API de Lingva Translate");
    }

    const data = await response.json();
    res.json({ translatedText: data.translation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al traducir el texto." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});