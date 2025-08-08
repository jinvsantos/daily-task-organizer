const express = require('express');
const app = express();

// Configuração de porta, com fallback para 3000
const PORT = process.env.PORT || 3000;

// Middleware para aceitar JSON no body das requisições
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Daily Task Organizer!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
