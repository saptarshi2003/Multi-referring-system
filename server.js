const http = require('http');
const app = require('./app');
const { initWebSocket } = require('./sockets/websocket');

const server = http.createServer(app);
initWebSocket(server);

server.listen(3000, () => console.log('Server running on port 3000'));


