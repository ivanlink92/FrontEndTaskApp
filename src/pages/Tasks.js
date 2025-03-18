// src/pages/Tasks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import "../styles/Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        "https://back-end-task-app.vercel.app/api/tasks/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Fetch tasks error:", err);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <h2>Your Tasks</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
