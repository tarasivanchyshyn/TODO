import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModel.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json(todos);
});
