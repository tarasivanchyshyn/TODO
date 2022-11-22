import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import todosRoutes from './api/routes/todosRoutes.js';
import usersRoutes from './api/routes/usersRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/todos', todosRoutes);
app.use('/api/auth', usersRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}!`));
