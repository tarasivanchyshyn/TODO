import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import todosRoutes from './routes/todosRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/todos', todosRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}!`));
