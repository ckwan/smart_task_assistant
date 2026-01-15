from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectResponse
from app.config import get_db, get_current_user
from app.services import project_service

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("", response_model=ProjectResponse)
def create_project(request: ProjectCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return project_service.create_project(db, request, current_user.id)

@router.get("", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return project_service.list_projects(db, current_user.id)