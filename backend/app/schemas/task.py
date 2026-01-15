from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TaskCreate(BaseModel):
    project_id: int
    title: str
    description: str | None
    assigned_user_id: int | None

class TaskResponse(TaskCreate):
    id: int
    status: str
    created_at: datetime

    # Pydantic v2 replacement for orm_mode
    model_config = ConfigDict(from_attributes=True)