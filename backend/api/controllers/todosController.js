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

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400).json({ message: 'Todo not found' });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json(updatedTodo);
});

export const deleteTodo = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    const todos = await Todo.find({ done: true }).deleteMany();
    res.status(200).json(todos);
    return;
  }

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400).json({ message: 'Todo not found' });
    return;
  }

  if (!req.user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  } else {
    await todo.remove();
    res.status(200).json({ id: req.params.id });
  }
});
