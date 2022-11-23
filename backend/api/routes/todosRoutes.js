import express from 'express';
import { getTodos, createTodo } from '../controllers/todosController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, createTodo);

export default router;
