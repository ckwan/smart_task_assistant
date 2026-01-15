from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config import get_db
from app.schemas.task import TaskCreate, TaskResponse
from app.services import task_service

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("", response_model=TaskResponse)
def create_task(
    request: TaskCreate,
    db: Session = Depends(get_db),
):
    return task_service.create_task(db, request)


@router.get("/project/{project_id}", response_model=list[TaskResponse])
def list_tasks(
    project_id: int,
    db: Session = Depends(get_db),
):
    return task_service.list_tasks(db, project_id)
