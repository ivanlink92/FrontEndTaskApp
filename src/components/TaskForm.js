// src/components/TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ addTask, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ completed, title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">Add Task</button>
          <button type="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
