import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { registerRoutes } from './routes/api';

dotenv.config();
const baseUrl = process.env.BASE_URL;
const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at ${baseUrl}:${port}`);
});
