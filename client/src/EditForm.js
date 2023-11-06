import React, { useState } from 'react';
import './App.css';

const EditForm = ({ task, onCancel, onSave }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Task</h2>
      <div className="input-group">
        <div className="input-column">
          <label>
            <strong>Task:</strong>
            <input type="text" name="title" value={editedTask.title} onChange={handleChange} required />
          </label>
          <label>
            <strong>Description:</strong>
            <input type="text" name="description" value={editedTask.description} onChange={handleChange} required />
          </label>
        </div>
        <label className="location-label">
          <strong>Task Area:</strong>
          <select name="location" value={editedTask.location} onChange={handleChange}>
            <option value="Inside">Inside</option>
            <option value="Outside">Outside</option>
          </select>
        </label>
      </div>
      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;
