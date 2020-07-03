const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();
const port = process.env.PORT || 3006;

const server = http.createServer(app);

server.listen(port, console.log(port));
