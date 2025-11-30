const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const CSV_PATH = path.join(__dirname, './CSV/palabras-musica.csv');

app.use(express.json());

// Servir frontend
app.use(express.static(__dirname));

// ENDPOINT: palabra aleatoria
app.get('/api/random', (req, res) => {
  try {
    const contenido = fs.readFileSync(CSV_PATH, 'utf8');
    const palabras = contenido
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(s => s !== "");

    if (!palabras.length) {
      return res.status(400).json({ error: "CSV vacío" });
    }

    const random = palabras[Math.floor(Math.random() * palabras.length)];
    res.json({ palabra: random });
  } catch (err) {
    res.status(500).json({ error: "No se pudo leer el archivo" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
