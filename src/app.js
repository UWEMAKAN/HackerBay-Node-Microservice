import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

import routes from './routes/routes';

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);
// app.use('/login', login);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.post('/login', (req, res) => {
//   return res.json({ data: req.body });
// });

server.listen(port);

export default server;
