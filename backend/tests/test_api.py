import pytest
from fastapi.testclient import TestClient


def test_read_root(client: TestClient):
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Task Management API"
    assert data["version"] == "1.0.0"


def test_health_check(client: TestClient):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


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
    assert data["description"] == task_data["description"]
    assert data["completed"] == task_data["completed"]
    assert data["priority"] == task_data["priority"]
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_create_task_invalid_priority(client: TestClient):
    """Test creating task with invalid priority"""
    task_data = {
        "title": "Test Task",
        "priority": "invalid"
    }
    response = client.post("/tasks", json=task_data)
    assert response.status_code == 422


def test_create_task_missing_title(client: TestClient):
    """Test creating task without title"""
    task_data = {
        "description": "No title task"
    }
    response = client.post("/tasks", json=task_data)
    assert response.status_code == 422


def test_get_tasks_empty(client: TestClient):
    """Test getting tasks when none exist"""
    response = client.get("/tasks")
    assert response.status_code == 200
    assert response.json() == []


def test_get_tasks(client: TestClient):
    """Test getting all tasks"""
    # Create multiple tasks
    tasks = [
        {"title": "Task 1", "priority": "high"},
        {"title": "Task 2", "priority": "medium", "completed": True},
        {"title": "Task 3", "priority": "low"}
    ]
    
    for task in tasks:
        client.post("/tasks", json=task)
    
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3


def test_get_task_by_id(client: TestClient):
    """Test getting a specific task by ID"""
    # Create a task
    task_data = {"title": "Test Task", "description": "Test description"}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]
    
    # Get the task
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == task_id
    assert data["title"] == task_data["title"]


def test_get_task_not_found(client: TestClient):
    """Test getting a non-existent task"""
    response = client.get("/tasks/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Task not found"


def test_update_task(client: TestClient):
    """Test updating a task"""
    # Create a task
    task_data = {"title": "Original Title", "priority": "low"}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]
    
    # Update the task
    update_data = {"title": "Updated Title", "completed": True, "priority": "high"}
    response = client.patch(f"/tasks/{task_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["completed"] is True
    assert data["priority"] == "high"


def test_update_task_partial(client: TestClient):
    """Test partial update of a task"""
    # Create a task
    task_data = {"title": "Original Title", "priority": "low"}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]
    
    # Update only completed status
    update_data = {"completed": True}
    response = client.patch(f"/tasks/{task_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Original Title"  # Unchanged
    assert data["completed"] is True  # Changed
    assert data["priority"] == "low"  # Unchanged


def test_update_task_not_found(client: TestClient):
    """Test updating a non-existent task"""
    update_data = {"title": "Updated Title"}
    response = client.patch("/tasks/999", json=update_data)
    assert response.status_code == 404


def test_delete_task(client: TestClient):
    """Test deleting a task"""
    # Create a task
    task_data = {"title": "Task to Delete"}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]
    
    # Delete the task
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 204
    
    # Verify it's deleted
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 404


def test_delete_task_not_found(client: TestClient):
    """Test deleting a non-existent task"""
    response = client.delete("/tasks/999")
    assert response.status_code == 404


def test_filter_tasks_by_completed(client: TestClient):
    """Test filtering tasks by completion status"""
    # Create tasks with different completion statuses
    client.post("/tasks", json={"title": "Incomplete Task 1"})
    client.post("/tasks", json={"title": "Complete Task", "completed": True})
    client.post("/tasks", json={"title": "Incomplete Task 2"})
    
    # Get completed tasks
    response = client.get("/tasks?completed=true")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["completed"] is True
    
    # Get incomplete tasks
    response = client.get("/tasks?completed=false")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert all(not task["completed"] for task in data)


def test_filter_tasks_by_priority(client: TestClient):
    """Test filtering tasks by priority"""
    # Create tasks with different priorities
    client.post("/tasks", json={"title": "High Priority", "priority": "high"})
    client.post("/tasks", json={"title": "Low Priority", "priority": "low"})
    client.post("/tasks", json={"title": "Medium Priority", "priority": "medium"})
    
    # Get high priority tasks
    response = client.get("/tasks?priority=high")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["priority"] == "high"


def test_search_tasks(client: TestClient):
    """Test searching tasks by title or description"""
    # Create tasks
    client.post("/tasks", json={"title": "Buy groceries", "description": "Milk and bread"})
    client.post("/tasks", json={"title": "Call dentist", "description": "Schedule appointment"})
    client.post("/tasks", json={"title": "Buy birthday gift"})
    
    # Search for "buy"
    response = client.get("/tasks?search=Buy")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    
    # Search for "dentist"
    response = client.get("/tasks?search=dentist")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert "dentist" in data[0]["title"]


def test_pagination(client: TestClient):
    """Test pagination of tasks"""
    # Create 10 tasks
    for i in range(10):
        client.post("/tasks", json={"title": f"Task {i+1}"})
    
    # Get first 5 tasks
    response = client.get("/tasks?skip=0&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
    
    # Get next 5 tasks
    response = client.get("/tasks?skip=5&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
