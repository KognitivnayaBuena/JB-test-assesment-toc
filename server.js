// const http = require('http');

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   const data = { message: 'Hello, World!', success: true };
//   res.end(JSON.stringify(data));
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// ----

import express from "express";
import path from "path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/serverData/TOCData.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/serverData/TOCData.json'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
