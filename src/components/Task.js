// src/components/Task.js
import React from "react";

const Task = ({ task }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        Status:{" "}
        <span style={{ color: task.completed ? "green" : "red" }}>
          {task.completed ? "Completed" : "Ready"}
        </span>
      </p>
    </div>
  );
};

export default Task;
