import express from 'express';
import cors from 'cors';

import hiveRouter from './routes/hive';


const app = express();

app.use(cors());

app.use('/api/hive', hiveRouter);

export default app;