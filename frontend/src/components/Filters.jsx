function Filters({ filters, onFilterChange }) {
  const handleCompletedChange = (e) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      completed: value === "all" ? null : value === "true",
    });
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      priority: value === "all" ? null : value,
    });
  };

  const handleSearchChange = (e) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={
            filters.completed === null ? "all" : filters.completed.toString()
          }
          onChange={handleCompletedChange}
        >
          <option value="all">All Tasks</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Priority</label>
        <select
          id="priority-filter"
          value={filters.priority || "all"}
          onChange={handlePriorityChange}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-group search-box">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default Filters;
