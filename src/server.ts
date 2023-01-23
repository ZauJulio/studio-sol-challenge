import * as http from 'http';
import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import debug from 'debug';
import * as winston from 'winston';
import * as bodyparser from 'body-parser';
import rateLimit from 'express-rate-limit';
import * as expressWinston from 'express-winston';

import Routes from './routes';

const app: Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

const debugLog: debug.IDebugger = debug('app');
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 2000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
});

// App: Middlewares
app.use(bodyparser.json(), cors({ origin: '*' }));

//  apply to all requests
app.use(limiter);

// App: Logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
);

// App: Routes
new Routes({ app, server });

// App: Default Route
app.get('/', (req: Request, res: Response) =>
  res.status(200).send(`Server running at http://localhost:${port}`),
);

server.listen(port, () =>
  debugLog(`Server running at http://localhost:${port}`),
);
