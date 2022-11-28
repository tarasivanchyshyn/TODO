import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todosController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getTodos)
  .post(protect, createTodo)
  .delete(protect, deleteTodo);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

export default router;
