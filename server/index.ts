import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { PORT } from '@server/config';
import { storageRouter } from '@server/routes';
import { logger } from '@server/utils';

// ----- init ----- //
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());

// ----- log ----- //
const requestLogger = (
   request: express.Request,
   response: express.Response,
   next: express.NextFunction
) => {
   const { method, path, body } = request;
   const message = { method, path, body };
   logger('received api call:', message);
   next();
};
app.use(requestLogger);

// ----- RESTful ----- //
app.use('/api/storage', storageRouter);

// ----- static serving ----- //
app.use(express.static('../dist')); // NOTE: this MUST come after API requests

// ----- unknown endpoint ----- //
const unknownEndpoint = (request: express.Request, response: express.Response) => {
   response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// ----- init and listen ----- //
app.listen(PORT, () => logger(`Web server running on port ${PORT}`));
