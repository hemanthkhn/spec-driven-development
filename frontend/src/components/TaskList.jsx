import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Tasks</h2>
        <span className="task-count">
          {tasks.filter((t) => !t.completed).length} active / {tasks.length}{" "}
          total
        </span>
      </div>
      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
