const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const UserController = require('./auth/controllers/UserController');
const Auth = require("./auth/middler/auth");
const Logger = require("./auth/middler/logger");
require('dotenv').config();

const app = express();
const port = 3001;


// Configuração dos middlewares para encaminhamento das solicitações
const optionsAgendamento = {
  target: process.env.Agendamento_API_URL,
  changeOrigin: true,
  logger: console,
};



// Middlewares de proxy para os microserviços
const agedamentoProxy = createProxyMiddleware(optionsAgendamento);


// Rota padrão
app.get('/', (req, res) => res.send('Hello Gateway API'));

// Rota para autenticação de usuário
app.post('/user/auth', UserController.auth);

// Middleware de autenticação JWT para proteger as rotas seguintes
app.use(Logger.log);
app.use(Auth.validate);

// Rotas encaminhadas para os microserviços

app.get('/login', agedamentoProxy);//Autenticação do Usuário (Paciente)  //Autenticação do Usuário (Médico) 
app.get('/medicos', agedamentoProxy);//Busca por Médicos (Paciente) 
app.post('/agenda', agedamentoProxy);//Cadastro/Edição de Horários Disponíveis (Médico)
app.post('/agenda/confima', agedamentoProxy);//Aceite de Consultas Médicas (Médico) 
app.post('/agenda/recusa', agedamentoProxy);// Recusa de Consultas Médicas (Médico) 
app.put('/agenda/update/:id', agedamentoProxy);// Cadastro/Edição de Horários Disponíveis (Médico)  
app.post('/agendamento', agedamentoProxy);//Agendamento de Consultas (Paciente) 




// Iniciando o servidor
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
