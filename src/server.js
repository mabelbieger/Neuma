// src/server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public (fora de src)
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Servir arquivos estáticos da pasta views (para CSS, JS que estão junto dos HTMLs)
app.use(express.static(path.join(__dirname, 'views')));

// Rota inicial: cadastro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'cadastro.html'));
});

// Rota de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});

// Rota home
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home', 'home1.html'));
});

// Rotas adicionais para teste e resultado
app.get('/questionario', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'teste', 'questionario.html'));
});

app.get('/resultado', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'teste', 'resultado.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
