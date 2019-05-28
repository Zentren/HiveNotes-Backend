import express from 'express';
import hiveRouter from './routes/hive';


const app = express();

app.use('/api/hive', hiveRouter);

export default app;