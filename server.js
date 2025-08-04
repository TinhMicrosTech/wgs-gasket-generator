import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';
import standardsRouter from './routes/standards.js';
import gasketRouter from './routes/gasket.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/api/auth', authRouter);
app.use('/api/standards', standardsRouter);
app.use('/api/gasket', gasketRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});