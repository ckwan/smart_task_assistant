from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TaskCreate(BaseModel):
    project_id: int
    title: str
    description: str | None
    status: str = "TODO"  # TODO / IN_PROGRESS / DONE
    assigned_user_id: int | None


class TaskResponse(TaskCreate):
    id: int
    status: str
    created_at: datetime
    description: str | None
    assigned_user_id: int | None

    # Pydantic v2 replacement for orm_mode
    model_config = ConfigDict(from_attributes=True)