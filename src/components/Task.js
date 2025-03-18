// src/components/Task.js
import React from "react";

const Task = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p className={`status ${task.completed ? "completed" : "ready"}`}>
        Status : {task.completed ? "Completed" : "Ready"}
      </p>
      <div className="task-actions">
        <button className="edit-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
