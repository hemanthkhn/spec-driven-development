function TaskItem({ task, onToggleComplete, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          aria-label={`Mark task "${task.title}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-meta">
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority}
            </span>
            <span className="task-date">
              Created: {formatDate(task.created_at)}
            </span>
          </div>
          <div className="task-actions">
            <button
              className="btn btn-small btn-delete"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(task.id);
                }
              }}
              aria-label={`Delete task "${task.title}"`}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
