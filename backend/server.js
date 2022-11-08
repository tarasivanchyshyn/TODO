import express from 'express';
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Fuck off'));
// }

app.listen(port, () => console.log(`Server started on port ${port}!`));
