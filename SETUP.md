# Task Management Application - Setup Guide

## Overview

This is a full-stack Task Management application built with:

- **Backend**: FastAPI (Python)
- **Frontend**: React with Vite
- **Database**: SQLite
- **Testing**: pytest (backend), Vitest + React Testing Library (frontend)

## Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- npm or yarn

## Project Structure

```
new feature/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application
│   │   ├── database.py      # Database configuration
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   └── crud.py          # Database operations
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py      # Test configuration
│   │   └── test_api.py      # API tests
│   ├── requirements.txt     # Python dependencies
│   └── pytest.ini          # pytest configuration
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── tasks.js     # API client
│   │   │   └── __tests__/   # API tests
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── __tests__/   # Component tests
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Installation

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

- On macOS/Linux:

```bash
source venv/bin/activate
```

- On Windows:

```bash
venv\Scripts\activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Start the Backend

1. Navigate to the backend directory and activate the virtual environment:

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

2. Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at: `http://localhost:8000`

- API Documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API Documentation (ReDoc): `http://localhost:8000/redoc`

### Start the Frontend

1. In a new terminal, navigate to the frontend directory:

```bash
cd frontend
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## Running Tests

### Backend Tests

1. Navigate to the backend directory with virtual environment activated:

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

2. Run all tests:

```bash
pytest
```

3. Run tests with coverage:

```bash
pytest --cov=app tests/
```

4. Run specific test file:

```bash
pytest tests/test_api.py
```

5. Run tests in verbose mode:

```bash
pytest -v
```

### Frontend Tests

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Run all tests:

```bash
npm test
```

3. Run tests with UI:

```bash
npm run test:ui
```

4. Run tests with coverage:

```bash
npm run coverage
```

5. Run tests in watch mode:

```bash
npm test -- --watch
```

## Features

### Implemented Features

1. **Create Tasks**: Add new tasks with title, description, and priority
2. **View Tasks**: Display all tasks with their details
3. **Update Tasks**: Mark tasks as complete/incomplete
4. **Delete Tasks**: Remove tasks from the list
5. **Filter Tasks**: Filter by completion status and priority
6. **Search Tasks**: Search tasks by title or description
7. **Pagination**: Support for paginated task lists

### API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks (with optional filters)
- `GET /tasks/{task_id}` - Get a specific task
- `PATCH /tasks/{task_id}` - Update a task
- `DELETE /tasks/{task_id}` - Delete a task

### Filter Parameters

- `completed`: Filter by completion status (true/false)
- `priority`: Filter by priority (low/medium/high)
- `search`: Search in title and description
- `skip`: Pagination offset (default: 0)
- `limit`: Pagination limit (default: 100, max: 100)

## Technology Stack

### Backend

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **pytest**: Testing framework
- **SQLite**: Embedded database

### Frontend

- **React**: UI library
- **Vite**: Build tool and development server
- **Axios**: HTTP client
- **Vitest**: Testing framework
- **React Testing Library**: React component testing utilities

## Database

The application uses SQLite for data persistence. The database file (`tasks.db`) is automatically created in the backend directory when you first run the application.

### Database Schema

**Tasks Table:**

- `id`: Integer (Primary Key)
- `title`: String (Required)
- `description`: String (Optional)
- `completed`: Boolean (Default: False)
- `priority`: String (low/medium/high, Default: medium)
- `created_at`: DateTime
- `updated_at`: DateTime

## Troubleshooting

### Backend Issues

1. **Port 8000 already in use:**

```bash
uvicorn app.main:app --reload --port 8001
```

2. **Database locked error:**

- Stop all running instances of the backend
- Delete `tasks.db` and restart

3. **Module not found errors:**

- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues

1. **Port 5173 already in use:**

- Stop other Vite processes or change port in `vite.config.js`

2. **Cannot connect to backend:**

- Ensure backend is running on port 8000
- Check CORS settings in `backend/app/main.py`

3. **Module not found errors:**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Development

### Adding New Features

1. **Backend:**

   - Add models in `models.py`
   - Add schemas in `schemas.py`
   - Add CRUD operations in `crud.py`
   - Add API endpoints in `main.py`
   - Add tests in `tests/`

2. **Frontend:**
   - Add components in `src/components/`
   - Add API methods in `src/api/tasks.js`
   - Add tests in `__tests__/` directories

### Code Quality

- Backend tests must pass before committing
- Frontend tests must pass before committing
- Follow Python PEP 8 style guide for backend
- Follow React best practices for frontend

## Production Deployment

For production deployment, consider:

1. **Backend:**

   - Use PostgreSQL instead of SQLite
   - Add environment variables for configuration
   - Use Gunicorn or similar WSGI server
   - Add authentication and authorization
   - Enable HTTPS

2. **Frontend:**
   - Build production bundle: `npm run build`
   - Serve static files with nginx or similar
   - Update API base URL for production
   - Enable HTTPS

## License

This project is for assessment purposes.
