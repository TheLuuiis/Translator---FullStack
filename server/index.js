'use strict'
// <    >  =>
    
import { error } from 'console';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.post("/api/translate", async (req, res) => {
    const { text, source, target } = req.body;

    if (!text || !source || !target) {
        return res.status(400).json({ error: "Faltan datos" });
    };

    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                source,
                target,
                format: "text",
            }),
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la traducción" });
    };
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

