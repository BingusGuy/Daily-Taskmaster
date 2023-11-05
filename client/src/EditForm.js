import React, { useState } from 'react';

const EditForm = ({ task, onCancel, onSave }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    setEditedTask((prevTask) => ({ ...prevTask, completed: false }));
    onSave(editedTask);
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <label>
        <strong>Task:</strong>
        <input type="text" name="title" value={editedTask.title} onChange={handleChange} required />
      </label>
      <label>
        <strong>Description:</strong>
        <input type="text" name="description" value={editedTask.description} onChange={handleChange} required />
      </label>
      <label>
        <strong>Location:</strong>
        <select name="location" value={editedTask.location} onChange={handleChange}>
          <option value="Inside">Inside</option>
          <option value="Outside">Outside</option>
        </select>
      </label>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;
