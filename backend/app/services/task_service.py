from sqlalchemy.orm import Session
from app.repositories import task_repo
from app.schemas.task import TaskCreate
from app.utils.enum import TaskStatus
from app.tasks.task_worker import process_task

def create_task_and_queue(db: Session, request: TaskCreate):
  task = task_repo.create_task(
        db,
        title=request.title,
        project_id=request.project_id,
        status=TaskStatus(request.status)
    )

  # Here you would add code to enqueue the task for processing
  process_task.delay(task["id"])

  return task


def create_task(db: Session, request: TaskCreate):
    return task_repo.create_task(
        db,
        title=request.title,
        project_id=request.project_id,
        status=TaskStatus(request.status)
    )


def get_task(db: Session, task_id: int):
    return task_repo.get_task_by_id(db, task_id)


def delete_task(db: Session, task_id: int):
    return task_repo.delete_task(db, task_id)


def update_task(db: Session, task_id: int, status: str):
    return task_repo.update_task_status(db, task_id, status)


def list_tasks(db: Session, project_id: int):
    return task_repo.get_tasks_for_project(db, project_id)
