import pytest
from app.services.project_service import create_project
from app.services.task_service import create_task, get_task, delete_task, list_tasks, update_task
from app.schemas.project import ProjectCreate
from app.schemas.task import TaskCreate
from app.utils.enum import TaskStatus

def test_create_task(db_session):
    project_request = ProjectCreate(name="Valid Name", description="Desc")
    # First create a project
    project = create_project(db_session, project_request, owner_id=1)

    task_request = TaskCreate(title="Test Task", description="Test Description", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    # Then create a task
    task = create_task(db_session, task_request)

    assert task["id"] is not None
    assert task["title"] == "Test Task"
    assert task["status"] == TaskStatus.TODO.value
    assert task["project_id"] == project["id"]

def test_update_task(db_session):
    project_request = ProjectCreate(name="Valid Name", description="Desc")
    project = create_project(db_session, project_request, owner_id=1)

    task_request = TaskCreate(title="Update Task", description="Update me", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    task = create_task(db_session, task_request)

    updated_task = update_task(db_session, task["id"], status=TaskStatus.IN_PROGRESS)
    assert updated_task["status"] == "IN_PROGRESS"


def test_get_task(db_session):
    project_request = ProjectCreate(name="Valid Name", description="Desc")
    project = create_project(db_session, project_request, owner_id=1)

    task_request = TaskCreate(title="Test Task", description="Test Description", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    task = create_task(db_session, task_request)

    fetched_task = get_task(db_session, task["id"])
    assert fetched_task["id"] == task["id"]
    assert fetched_task["title"] == "Test Task"


# TODO: Fix delete task test
# def test_delete_task(db_session):
#     project_request = ProjectCreate(name="Valid Name", description="Desc")

#     project = create_project(db_session, project_request, owner_id=1)
#     task_request = TaskCreate(title="To Delete", description="Delete me", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
#     task = create_task(db_session, task_request)

#     deleted = delete_task(db_session, task["id"])
#     print(deleted)
#     assert deleted is True

#     # Verify deletion
#     fetched = get_task(db_session, task["id"])
#     print(fetched)
#     assert fetched is None

def test_update_task_in_progress_status(db_session):
    project_request = ProjectCreate(name="Valid Name", description="Desc")

    project = create_project(db_session, project_request, owner_id=1)
    task_request = TaskCreate(title="Invalid Status Task", description="Test", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    task = create_task(db_session, task_request)


def test_list_tasks(db_session):
    project_request = ProjectCreate(name="Valid Name", description="Desc")

    project = create_project(db_session, project_request, owner_id=1)
    task_request_1 = TaskCreate(title="Task 1", description="Task 1 Description", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    task_request_2 = TaskCreate(title="Task 2", description="Task 2 Description", project_id=project["id"], assigned_user_id=None, status=TaskStatus.TODO)
    task = create_task(db_session, task_request_1)
    task = create_task(db_session, task_request_2)

    tasks = list_tasks(db_session, project_id=project["id"])
    assert len(tasks) == 2
    assert tasks[0]["title"] == "Task 1"
    assert tasks[1]["title"] == "Task 2"


def test_create_task_invalid_project(db_session):

    with pytest.raises(Exception):
        create_task(db_session, "Task", project_id=9999)

