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

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem("access");
      const userid = localStorage.getItem("id");
      newTask.user = userid;
      console.log("task :", newTask);
      const response = await axios.post(
        "https://back-end-task-app.vercel.app/api/tasks/",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      console.log("Task added:", response.data);
      setShowForm(false);
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error("Add task error:", err);
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
      {/* Add Task button */}
      <button onClick={() => setShowForm(true)}>Add Task</button>
      {/* Pop-up modal for adding tasks */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <TaskForm
              addTask={addTask}
              closeModal={() => setShowForm(false)} // Pass a function to close the modal
            />
          </div>
        </div>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
