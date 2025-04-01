// src/components/TaskForm.js
import React, { useState, } from "react";

const TaskForm = ({ addTask, closeModal, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [completed, setCompleted] = useState(
    taskToEdit ? taskToEdit.completed : false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ completed, title, description });
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <div className="task-form">
      <h3>{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
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
        <div className="status-checkbox">
          <label>
            <input
              type="checkbox"
              className={taskToEdit ? "aaa" : "bbb"}
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            {completed ? "Completed" : taskToEdit ? "Ready" : ""}
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit">
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
          <button type="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
