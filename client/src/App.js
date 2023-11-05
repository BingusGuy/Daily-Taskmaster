import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './weatherDisplay.js';
import EditForm from './EditForm.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '', // Updates this with the user assigned task name
    description: '', // Updates this with the user assigned description
    location: '', // Inside or Outside, depending on what user selects
  });

  const handleChange = (e) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [e.target.name]: e.target.value,
    }));
  };

  // Handles the submission boxes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const todoDefault = { ...newTodo, location: newTodo.location || 'Inside' };
      const response = await axios.post('http://localhost:5000/todos', todoDefault);
      setTodos([...todos, response.data]);
      if (response.data.location === 'Outside') {
        setOutsideTask(true);
      }
      setNewTodo({
        title: '', // Updates this with the user assigned task name
        description: '', // Updates this with the user assigned description
        location: '', // Inside or Outside, depending on what user selects
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Handles the deletion of tasks
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      try {
        const deletedTask = todos.find((todo) => todo._id === taskId);
        await axios.delete(`http://localhost:5000/todos/${taskId}`);
        setTodos(todos.filter((todo) => todo._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Allows tasks to be marked as complete
  const handleComplete = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${taskId}`, {
        completed: true,
      });
  
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === taskId ? { ...todo, completed: true } : todo
          )
        );
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  
  // Gets all the tasks
  const [hasOutsideTask, setOutsideTask] = useState(false);
  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
      
      const hasOutside = response.data.some((todo) => todo.location === 'Outside');
      setOutsideTask(hasOutside);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  fetchTodos();
  }, []);

  // Checks all the tasks to see if there are outside tasks
  useEffect(() => {
    const hasRemainingOutsideTasks = todos.some((todo) => todo.location === 'Outside' && todo.completed === false);
    setOutsideTask(hasRemainingOutsideTasks);
  }, [todos]);

  const [editingTask, setEditingTask] = useState(null);

  // Function to handle the start of the editing process
  const handleEdit = (taskId) => {
    const taskToEdit = todos.find((todo) => todo._id === taskId);
    setEditingTask(taskToEdit);
  };

  // Function to handle saving the edited task
  const handleSaveEdit = async (editedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${editedTask._id}`, editedTask);
      setTodos(todos.map((todo) => (todo._id === editedTask._id ? response.data : todo)));
      setEditingTask(null); // Clear the editing state
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to handle canceling the editing process
  const handleCancelEdit = () => {
    setEditingTask(null); // Clear the editing state
  };

  return (
    <div className="App">
      <h1>Daily Taskmaster</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Task:</strong>
          <input type="text" name="title" value={newTodo.title} onChange={handleChange} required />
        </label>
        <label>
          <strong>Description:</strong>
          <input type="text" name="description" value={newTodo.description} onChange={handleChange} required />
        </label>
        <label>
          <strong>Location:</strong>
          <select name="location" value={newTodo.location} onChange={handleChange}>
            <option value="Inside">Inside</option>
            <option value="Outside">Outside</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>
      <div className="separator"></div>
      {hasOutsideTask ? (
        <div>
          <p className="message">Looks like you have an outside task! Here's the weather for the day: </p>
          <WeatherDisplay />
        </div>
      ) : (
        <p className="message">No outside tasks for today. Seems like the weather wont be a problem. Lucky you!</p>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <strong>{todo.title}</strong> - {todo.description} - <i>{todo.location}</i> : <strong>({todo.completed ? 'Completed' : 'Incomplete'})</strong>

            {!todo.completed && (
              <React.Fragment>
                <button onClick={() => handleComplete(todo._id)}>Complete</button>
                <button className="edit" onClick={() => handleEdit(todo._id)}>Edit</button>
              </React.Fragment>
            )}
            <button className="delete" onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        ))}
      </ul>
      {editingTask && (
        <EditForm task={editingTask} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
      )}
    </div>
  );
}

export default App;
