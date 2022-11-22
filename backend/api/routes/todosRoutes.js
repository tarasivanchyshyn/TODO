import express from 'express';
import { getTodos } from '../controllers/todosController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTodos);

export default router;
