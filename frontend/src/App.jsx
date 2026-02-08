import { useState, useEffect } from "react";
import { tasksAPI } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    completed: null,
    priority: null,
    search: "",
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.completed !== null) params.completed = filters.completed;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;

      const data = await tasksAPI.getTasks(params);
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks. Make sure the backend is running.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await tasksAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
      return true;
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
      return false;
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await tasksAPI.updateTask(id, updates);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      setError("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleToggleComplete = async (task) => {
    await handleUpdateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>✨ Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </div>

      {error && (
        <div className="error" role="alert">
          {error}
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: "10px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      <TaskForm onSubmit={handleCreateTask} />

      <Filters filters={filters} onFilterChange={setFilters} />

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
