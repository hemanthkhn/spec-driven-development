from sqlalchemy.orm import Session
from . import models, schemas
from typing import Optional, List


def create_task(db: Session, task: schemas.TaskCreate) -> models.Task:
    """Create a new task"""
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    """Get a task by ID"""
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_tasks(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    completed: Optional[bool] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None
) -> List[models.Task]:
    """Get all tasks with optional filters"""
    query = db.query(models.Task)
    
    if completed is not None:
        query = query.filter(models.Task.completed == completed)
    
    if priority:
        query = query.filter(models.Task.priority == priority)
    
    if search:
        query = query.filter(
            models.Task.title.contains(search) | 
            models.Task.description.contains(search)
        )
    
    return query.offset(skip).limit(limit).all()


def update_task(
    db: Session, task_id: int, task_update: schemas.TaskUpdate
) -> Optional[models.Task]:
    """Update a task"""
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int) -> bool:
    """Delete a task"""
    db_task = get_task(db, task_id)
    if not db_task:
        return False
    
    db.delete(db_task)
    db.commit()
    return True
