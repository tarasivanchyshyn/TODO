import express from 'express';
import { getTodos } from '../controllers/todosController.js';

const router = express.Router();

router.route('/').get(getTodos);

export default router;
