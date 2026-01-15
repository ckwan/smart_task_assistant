from sqlalchemy.orm import Session
from app.repositories import project_repo
from app.schemas.project import ProjectCreate


def create_project(
    db: Session,
    request: ProjectCreate,
    owner_id: int,
):
    if len(request.name) < 3:
        raise ValueError("Project name must be at least 3 characters")

    return project_repo.create_project(
        db,
        name=request.name,
        description=request.description,
        owner_id=owner_id,
    )


def list_projects(db: Session, owner_id: int):
    return project_repo.get_projects_by_owner(db, owner_id)