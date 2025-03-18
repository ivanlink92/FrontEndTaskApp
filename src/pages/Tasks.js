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
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("access");

      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://back-end-task-app.vercel.app/api/tasks/",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Fetch tasks error:", err);
    }
  };

  // Add a new task
  const handleTask = async (taskData) => {
    try {
      const token = localStorage.getItem("access");
      const userId = localStorage.getItem("id");
      if (taskToEdit) {
        // Update the task
        let data = JSON.stringify({
          id: taskToEdit.id,
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed,
          user: userId,
        });
        console.log(data);
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url:
            "https://back-end-task-app.vercel.app/api/tasks/" +
            taskToEdit.id +
            "/",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: data,
        };
        axios
          .request(config)
          .then((response) => {
            setTasks(
              tasks.map((task) =>
                task.id === taskToEdit.id ? response.data : task
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Add a new task
        let data = JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed,
          user: userId,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://back-end-task-app.vercel.app/api/tasks/",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            fetchTasks();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setShowForm(false);
      setTaskToEdit(null);
    } catch (err) {
      setError(taskToEdit ? "Failed to update task." : "Failed to add task.");
      console.error(taskToEdit ? "Update task error:" : "Add task error:", err);
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
      <button onClick={() => setShowForm(true)}>Add Task</button>
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <TaskForm
              addTask={handleTask}
              closeModal={() => {
                setShowForm(false);
                setTaskToEdit(null);
              }}
              taskToEdit={taskToEdit}
            />
          </div>
        </div>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={(task) => {
              setTaskToEdit(task);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
