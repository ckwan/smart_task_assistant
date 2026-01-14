from pydantic import BaseModel
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

    class Config:
        orm_mode = True
