import express from 'express';
import "express-async-errors";
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import path from 'path';

import { routes } from './routes';
import { errorHandling } from './middlewares/error-handling';

const app = express();

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);

app.use(errorHandling);

export { app };