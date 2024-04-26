const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const UserController = require('./auth/controllers/UserController');
const Auth = require("./auth/middler/auth");
const Logger = require("./auth/middler/logger");

const app = express();
const port = 3007;

const {
  PAGAMENTOS_API_URL,
  PEDIDOS_API_URL,
} = require('./URL');

// Configuração dos middlewares para encaminhamento das solicitações
const optionsPedidos = {
  target: PEDIDOS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsPagamentos = {
  target: PAGAMENTOS_API_URL,
  changeOrigin: true, 
  logger: console,
};

const optionsEntrega = {
    target: Entrega_API_URL,
    changeOrigin: true, 
    logger: console,
  };

// Middlewares de proxy para os microserviços
const pedidosProxy = createProxyMiddleware(optionsPedidos);
const pagamentosProxy = createProxyMiddleware(optionsPagamentos);
const entregaProxy = createProxyMiddleware(optionsEntrega);

// Rota para autenticação de usuário
app.post('/user/auth', UserController.auth);

// Middleware de autenticação JWT para proteger as rotas seguintes
app.use(Logger.log);
app.use(Auth.validate);

// Rotas encaminhadas para os microserviços
app.get('/checkout/:pedidoId/status', pagamentosProxy);
app.post('/checkout', pagamentosProxy);
app.put('/checkout/hook/:pedido_id', pagamentosProxy);

app.get('/pedidos', pedidosProxy);
app.post('/pedidos', pedidosProxy);
app.put('/pedidos/update/:id', pedidosProxy);
app.get('/pedidos/:id', pedidosProxy);


app.get('/producao', entregaProxy);
app.post('/producao', entregaProxy);
app.put('/producao/update/:idPedido', entregaProxy);
app.get('/producao/:idPedido', entregaProxy);

// Rota padrão
app.get('/', (req, res) => res.send('Hello Gateway API'));

// Iniciando o servidor
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
