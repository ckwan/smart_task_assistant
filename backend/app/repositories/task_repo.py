from sqlalchemy import text
from sqlalchemy.orm import Session
from app.utils.enum import TaskStatus


def create_task(
    db: Session,
    title: str,
    project_id: int,
    status: TaskStatus,
    description: str | None = None,
    assigned_user_id: int | None = None,
):
    query = text("""
        INSERT INTO tasks (title, project_id, status, description, assigned_user_id)
        VALUES (:title, :project_id, :status, :description, :assigned_user_id)
        RETURNING id, title, status, project_id, created_at, description, assigned_user_id
    """)

    result = db.execute(
        query,
        {
            "title": title,
            "project_id": project_id,
            "status": status.value,
            "description": description,
            "assigned_user_id": assigned_user_id,
        },
    ).mappings().first()

    return result

def update_task_status(db: Session, task_id: int, status: TaskStatus):
    query = text("""
        UPDATE tasks
        SET status = :status
        WHERE id = :task_id
        RETURNING id, title, status, project_id, created_at
    """)

    result = db.execute(
        query,
        {
            "status": status.value,
            "task_id": task_id,
        },
    ).mappings().first()

    return result

def get_task_by_id(db: Session, task_id: int):
    query = text("""
        SELECT id, title, status, project_id, created_at
        FROM tasks
        WHERE id = :task_id
    """)

    result = db.execute(query, {"task_id": task_id}).mappings().first()
    return result

def delete_task(db: Session, task_id: int):
    query = text("""
        DELETE FROM tasks
        WHERE id = :task_id
        RETURNING id, title, status, project_id, created_at
    """)

    result = db.execute(query, {"task_id": task_id}).mappings().first()

    return result

def get_tasks_for_project(db: Session, project_id: int):
    query = text("""
        SELECT id, title, status, project_id, created_at, description, assigned_user_id
        FROM tasks
        WHERE project_id = :project_id
        ORDER BY created_at
    """)

    return db.execute(query, {"project_id": project_id}).mappings().all()
