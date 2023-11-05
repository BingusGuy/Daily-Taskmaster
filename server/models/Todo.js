const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
});

todoSchema.statics.deleteManyTasks = async function () {
  try {
    await this.deleteMany();
    console.log('All tasks deleted successfully');
  } catch (error) {
    console.error('Error deleting tasks:', error);
    throw error;
  }
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
