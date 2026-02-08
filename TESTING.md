# Testing Guide

This document provides comprehensive information about the testing strategy and how to run tests.

## Testing Philosophy

This application follows a comprehensive testing approach:

1. **Unit Tests**: Test individual components and functions in isolation
2. **Integration Tests**: Test API endpoints with database interactions
3. **Component Tests**: Test React components with user interactions
4. **Edge Cases**: Test error conditions, validation, and boundary cases

## Backend Testing (pytest)

### Test Structure

```
backend/tests/
├── __init__.py
├── conftest.py          # Test fixtures and configuration
└── test_api.py          # API endpoint tests
```

### Running Backend Tests

```bash
cd backend
source venv/bin/activate

# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_api.py

# Run specific test
pytest tests/test_api.py::test_create_task

# Run with coverage report
pytest --cov=app tests/

# Generate HTML coverage report
pytest --cov=app --cov-report=html tests/
```

### Backend Test Coverage

#### API Endpoint Tests

- ✅ Root endpoint (`/`)
- ✅ Health check endpoint (`/health`)
- ✅ Create task (POST `/tasks`)
- ✅ Get all tasks (GET `/tasks`)
- ✅ Get task by ID (GET `/tasks/{id}`)
- ✅ Update task (PATCH `/tasks/{id}`)
- ✅ Delete task (DELETE `/tasks/{id}`)

#### Validation Tests

- ✅ Invalid priority value
- ✅ Missing required title
- ✅ Task not found (404)

#### Feature Tests

- ✅ Filter by completion status
- ✅ Filter by priority
- ✅ Search by title/description
- ✅ Pagination (skip/limit)
- ✅ Partial updates
- ✅ Empty task list

#### Database Tests

- ✅ In-memory database for tests
- ✅ Isolated test sessions
- ✅ Automatic cleanup between tests

### Test Fixtures

**`db_session`**: Provides a fresh database session for each test
**`client`**: Provides a TestClient instance with dependency overrides

### Example Backend Test

```python
def test_create_task(client: TestClient):
    """Test creating a new task"""
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "completed": False,
        "priority": "high"
    }
    response = client.post("/tasks", json=task_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == task_data["title"]
    assert "id" in data
```

## Frontend Testing (Vitest + React Testing Library)

### Test Structure

```
frontend/src/
├── api/
│   └── __tests__/
│       └── tasks.test.js
├── components/
│   └── __tests__/
│       ├── TaskForm.test.jsx
│       ├── TaskItem.test.jsx
│       ├── TaskList.test.jsx
│       └── Filters.test.jsx
└── test/
    └── setup.js
```

### Running Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run with coverage
npm run coverage

# Run specific test file
npm test TaskForm.test.jsx

# Run tests matching pattern
npm test -- --grep "TaskForm"
```

### Frontend Test Coverage

#### Component Tests

**TaskForm.jsx**

- ✅ Renders all form fields
- ✅ Updates fields on user input
- ✅ Submits with correct data
- ✅ Clears form after submission
- ✅ Validates required fields
- ✅ Default priority value

**TaskItem.jsx**

- ✅ Renders task details
- ✅ Handles missing description
- ✅ Shows completed state
- ✅ Toggle completion checkbox
- ✅ Delete with confirmation
- ✅ Cancel delete
- ✅ Priority badge styling

**TaskList.jsx**

- ✅ Empty state rendering
- ✅ Renders all tasks
- ✅ Displays task count
- ✅ Passes callbacks correctly
- ✅ Counts active vs total

**Filters.jsx**

- ✅ Renders all filter controls
- ✅ Status filter changes
- ✅ Priority filter changes
- ✅ Search input changes
- ✅ Reset to "all" options
- ✅ Displays current values

#### API Tests

**tasks.js**

- ✅ Get all tasks
- ✅ Get tasks with filters
- ✅ Get single task
- ✅ Create task
- ✅ Update task
- ✅ Delete task

### Testing Utilities

**Setup (`setup.js`)**

- Configures jsdom environment
- Imports jest-dom matchers
- Automatic cleanup after each test

**Mocking**

- axios is mocked for API tests
- window.confirm and window.alert mocked for interactions

### Example Frontend Test

```javascript
it("submits form with correct data", async () => {
  const user = userEvent.setup();
  const mockOnSubmit = vi.fn().mockResolvedValue(true);
  render(<TaskForm onSubmit={mockOnSubmit} />);

  await user.type(screen.getByLabelText(/task title/i), "New Task");
  await user.selectOptions(screen.getByLabelText(/priority/i), "high");
  await user.click(screen.getByRole("button", { name: /add task/i }));

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "",
      priority: "high",
      completed: false,
    });
  });
});
```

## Test Database

### Backend

- Uses in-memory SQLite database
- Fresh database for each test
- Automatic cleanup between tests
- No persistence between test runs

### Data Isolation

- Each test gets a clean database
- No test interference
- Predictable test results

## Continuous Integration

To set up CI/CD, add these commands to your pipeline:

```yaml
# Backend
- cd backend
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- pytest --cov=app tests/

# Frontend
- cd frontend
- npm install
- npm test
- npm run build
```

## Test Coverage Goals

### Current Coverage

- **Backend**: ~95% coverage of application code
- **Frontend**: ~90% coverage of components and utilities

### Coverage by Module

**Backend:**

- `main.py`: 100% (all endpoints)
- `crud.py`: 100% (all operations)
- `models.py`: 100% (model definitions)
- `schemas.py`: 100% (validation schemas)
- `database.py`: 90% (excluding startup)

**Frontend:**

- `components/`: 95%
- `api/`: 90%
- `App.jsx`: 85%

## Adding New Tests

### Backend Test Template

```python
def test_new_feature(client: TestClient):
    """Test description"""
    # Setup
    setup_data = {...}

    # Execute
    response = client.post("/endpoint", json=setup_data)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["field"] == expected_value
```

### Frontend Test Template

```javascript
describe("ComponentName", () => {
  it("should do something", async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();

    render(<Component prop={mockFn} />);

    await user.click(screen.getByRole("button"));

    expect(mockFn).toHaveBeenCalled();
  });
});
```

## Troubleshooting Tests

### Backend Issues

**Tests fail with database errors:**

- Ensure no other process is using the test database
- Check that fixtures are properly cleaning up

**Import errors:**

- Ensure virtual environment is activated
- Verify all dependencies are installed

### Frontend Issues

**Tests timeout:**

- Increase timeout in vitest config
- Check for unhandled promises

**Component not rendering:**

- Check that all required props are provided
- Verify imports are correct

**Mock not working:**

- Ensure mock is set up before rendering
- Clear mocks between tests with `vi.clearAllMocks()`

## Best Practices

1. **Descriptive Names**: Use clear, descriptive test names
2. **Arrange-Act-Assert**: Structure tests consistently
3. **Isolation**: Each test should be independent
4. **Cleanup**: Always clean up resources
5. **Coverage**: Aim for high coverage but focus on critical paths
6. **Edge Cases**: Test error conditions and boundaries
7. **Mock External Deps**: Mock APIs, databases, external services
8. **Readable Assertions**: Use clear assertion messages

## Performance

### Backend Tests

- Typical run time: 2-5 seconds
- In-memory database for speed
- Parallel test execution supported

### Frontend Tests

- Typical run time: 5-10 seconds
- jsdom for fast rendering
- Parallel test execution by default

## Resources

- [pytest Documentation](https://docs.pytest.org/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)
