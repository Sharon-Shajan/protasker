const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// @desc    Get tasks
// @route   GET /api/tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
router.post('/', async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const task = await Task.create({
    text: req.body.text,
    status: req.body.status
  });
  res.status(200).json(task);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }
  await task.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = router;