from app.repositories.project_repo import create_project, get_projects_by_owner


def test_create_project(db_session):
    project = create_project(
        db_session,
        name="Test Project",
        description="Desc",
        owner_id=1,
    )

    assert project["id"] is not None
    assert project["name"] == "Test Project"
    assert project["owner_id"] == 1


def test_get_projects_by_owner(db_session):
    create_project(db_session, "A", None, 1)
    create_project(db_session, "B", None, 1)

    projects = get_projects_by_owner(db_session, owner_id=1)

    assert len(projects) == 2
