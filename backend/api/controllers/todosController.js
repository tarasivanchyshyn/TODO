import asyncHandler from 'express-async-handler';
import Todo from '../models/todoModel.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json(todos);
});

export const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.creationDate || !req.body.expirationDate) {
    res.status(400).json({ message: 'Please add all fields to create' });
    return;
  }

  const todo = await Todo.create({
    done: false,
    text: req.body.text,
    creationDate: req.body.creationDate,
    expirationDate: req.body.expirationDate,
    user: req.user.id
  });

  res.status(201).json(todo);
});
