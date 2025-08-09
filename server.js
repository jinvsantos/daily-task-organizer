const express = require('express');
const app = express();
// Configuração de porta, com fallback para 3000
const PORT = process.env.PORT || 3000;

// Middleware para aceitar JSON no body das requisições
app.use(express.json());
const taskRoutes = require('./src/routes/taskRoutes'); // importa as rotas
app.use('/api', taskRoutes); 

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Daily Task Organizer!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
