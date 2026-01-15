import pytest
from app.services.project_service import create_project
from app.schemas.project import ProjectCreate


def test_create_project_validation(db_session):
    request = ProjectCreate(name="A", description=None)

    with pytest.raises(ValueError):
        create_project(db_session, request, owner_id=1)


def test_create_project_success(db_session):
    request = ProjectCreate(name="Valid Name", description="Desc")

    project = create_project(db_session, request, owner_id=1)

    assert project["name"] == "Valid Name"
