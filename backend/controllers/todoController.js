const Todo = require('../models/Todo');
const mongoose = require('mongoose');


const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json({ data: todos });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const todo = new Todo({ user: req.user.id, title, description });
    await todo.save();
    res.status(201).json({ data: todo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    await todo.save();
    res.json({ data: todo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    console.log('Request to delete todo with ID:', req.params.id);

    // Validasi ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ID');
      return res.status(400).json({ message: 'Invalid ID' });
    }

    // Hapus Todo berdasarkan ID dan validasi kepemilikan
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      console.log('Todo not found');
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      console.log('Unauthorized access');
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    console.log('Todo deleted successfully');
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Failed to delete todo:', error.message);
    res.status(500).json({ message: 'Failed to delete todo', error: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
