import express, { Request, NextFunction, Response } from 'express';
import { authRouter, pointsRouter } from './routes/api/index';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises';
import path from 'path';

export interface CustomError extends Error {
  name: string;
  code?: number | string;
  status?: number | string;
}

const jsonPath = './swagger.json';
const swaggerDocumentPath = path.resolve(jsonPath);

async function readSwaggerDocument() {
  const data = await fs.readFile(swaggerDocumentPath);
  const swaggerDocument = JSON.parse(data.toString());
  return swaggerDocument;
}

dotenv.config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const corsOptions = {
  origin: [
    'https://github.com',
    'https://serhieie.github.io',
    'https://serhieie.github.io/goit-vue-project',
    'https://serhieie.github.io/goit-vue-project/auth',
    'https://serhieie.github.io/goit-vue-project/auth/registration',
    'https://serhieie.github.io/goit-vue-project/auth/login',
    'https://serhieie.github.io/goit-vue-project/map',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/points', pointsRouter);
app.use(
  '/api/docs',
  swaggerUi.serve,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const swaggerDocument = await readSwaggerDocument();
      swaggerUi.setup(swaggerDocument)(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server Error ' } = err;
  res.status(status).json({ message });
});

export default app;
