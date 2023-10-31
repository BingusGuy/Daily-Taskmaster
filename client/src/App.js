import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './weatherDisplay.js';

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
    try {
      const deletedTask = todos.find((todo) => todo._id === taskId);
      await axios.delete(`http://localhost:5000/todos/${taskId}`);
      setTodos(todos.filter((todo) => todo._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Allows tasks to be marked as complete
  const handleComplete = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${taskId}`, {
        completed: true,
      });
      setTodos(todos.map((todo) => (todo._id === taskId ? response.data : todo)));
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
        
        const hasOutside = response.data.some((todo) => todo.location == 'Outside');
        setOutsideTask(hasOutside);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Checks all the tasks to see if there are outside tasks
  useEffect(() => {
    const hasRemainingOutsideTasks = todos.some((todo) => todo.location === 'Outside');
    setOutsideTask(hasRemainingOutsideTasks);
  }, [todos]);

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
      {hasOutsideTask && (
        <div>
          <p className="message">Looks like you have an outside task! Here's the weather for the day: </p>
          <WeatherDisplay className="info" />
        </div>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <strong>{todo.title}</strong> - {todo.description} - <i>{todo.location}</i> : <strong>({todo.completed ? 'Completed' : 'Incomplete'})</strong>

            {!todo.completed && (
              <button onClick={() => handleComplete(todo._id)}>Complete</button>
            )}
            <button className="delete" onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;