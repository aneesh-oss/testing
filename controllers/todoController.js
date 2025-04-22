const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title, userId: req.user._id });
  await todo.save();
  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { status },
    { new: true }
  );

  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
  res.json({ message: 'Deleted successfully' });
};
