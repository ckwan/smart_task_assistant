from pydantic import BaseModel, ConfigDict
from typing import Optional

class ProjectCreate(BaseModel):
    name: str
    description: str | None

class ProjectResponse(ProjectCreate):
    id: int
    owner_id: int

    # Pydantic v2 replacement for orm_mode
    model_config = ConfigDict(from_attributes=True)
