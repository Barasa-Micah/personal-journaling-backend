import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import journalRoutes from './routes/journalRoutes';
import { dbInit } from './models';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);

const PORT = process.env.PORT || 5000;

dbInit()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to initialize the database:', error);
  });
