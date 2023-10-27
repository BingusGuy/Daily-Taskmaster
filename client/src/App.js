import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    Task: '', // Update key to Task
    Description: '', // Update key to Description
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
        Task: '', // Update key to Task
        Description: '', // Update key to Description
      });
    } catch (error) {
      console.error('Error creating task:', error);
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
          Task: {/* Update label */}
          <input type="text" name="Task" value={newTodo.Task} onChange={handleChange} required />
        </label>
        <label>
          Description: {/* Update label */}
          <input type="text" name="Description" value={newTodo.Description} onChange={handleChange} required />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.Task} - {todo.Description} ({todo.completed ? 'Completed' : 'Incomplete'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;