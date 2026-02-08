import { useState, useEffect } from 'react'
import './FilterBar.css'

function FilterBar({ filters, onFilterChange, taskCount }) {
  const [searchInput, setSearchInput] = useState(filters.search || '')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchInput })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  const handleCompletedFilter = (value) => {
    onFilterChange({ completed: value })
  }

  const handlePriorityFilter = (value) => {
    onFilterChange({ priority: value })
  }

  const clearFilters = () => {
    setSearchInput('')
    onFilterChange({
      completed: null,
      priority: null,
      search: ''
    })
  }

  const hasActiveFilters = filters.completed !== null || filters.priority || filters.search

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>Filters</h3>
        <span className="task-count">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
      </div>

      <div className="filter-content">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Status</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filters.completed === null ? 'active' : ''}`}
              onClick={() => handleCompletedFilter(null)}
            >
              All
            </button>
            <button
              className={`filter-btn ${filters.completed === false ? 'active' : ''}`}
              onClick={() => handleCompletedFilter(false)}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filters.completed === true ? 'active' : ''}`}
              onClick={() => handleCompletedFilter(true)}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Priority</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${!filters.priority ? 'active' : ''}`}
              onClick={() => handlePriorityFilter(null)}
            >
              All
            </button>
            <button
              className={`filter-btn priority-high ${filters.priority === 'high' ? 'active' : ''}`}
              onClick={() => handlePriorityFilter('high')}
            >
              🔴 High
            </button>
            <button
              className={`filter-btn priority-medium ${filters.priority === 'medium' ? 'active' : ''}`}
              onClick={() => handlePriorityFilter('medium')}
            >
              🟡 Medium
            </button>
            <button
              className={`filter-btn priority-low ${filters.priority === 'low' ? 'active' : ''}`}
              onClick={() => handlePriorityFilter('low')}
            >
              🟢 Low
            </button>
          </div>
        </div>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterBar
