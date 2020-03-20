import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

import http from 'http';
import path from 'path';
import fs from 'fs';

import swaggerDocument from '../swagger.json';
import routes from './routes/routes';

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), {flags: 'a'}
);
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  return res.redirect('/api-docs');
});

server.listen(port);

export default server;
export { app as app };
