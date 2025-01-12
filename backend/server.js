const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

connectDB();

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
