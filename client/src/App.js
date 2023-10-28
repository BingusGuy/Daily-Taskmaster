import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '', // Update key to Task
    description: '', // Update key to Description
    location: '',
  });

  const handleChange = (e) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/todos', newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({
        title: '', // Update key to Task
        description: '', // Update key to Description
        location: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${taskId}`);
      setTodos(todos.filter((todo) => todo._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
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
  

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Daily Taskmaster</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task:
          <input type="text" name="title" value={newTodo.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={newTodo.description} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={newTodo.location} onChange={handleChange} required />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong> - {todo.description} - <i>{todo.location}</i> : <strong>({todo.completed ? 'Completed' : 'Incomplete'})</strong>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleComplete(todo._id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;