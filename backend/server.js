import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.get('/api/todos', (req, res) => {
  res.send('Todos');
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
