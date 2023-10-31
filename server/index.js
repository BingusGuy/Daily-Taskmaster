const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;
// password P9BpQ8eQjjkYquW5
// Connects to MongoDB
mongoose.connect('mongodb+srv://ac31:P9BpQ8eQjjkYquW5@cluster0.msgoxxi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

app.use(express.json());
app.use(cors());

// Gets all tasks
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Gets a specific task by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Creates a new task
app.post('/todos', async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Creates a new task instance with the extracted values
    const newTodo = new Todo({ title, description, location });

    // Saves the task to the database
    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Updates a task by ID
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, completed: true },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating task by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Deletes a task by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(deletedTodo);
  } catch (error) {
    console.error('Error deleting task by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
