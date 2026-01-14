from pydantic import BaseModel

class ProjectCreate(BaseModel):
    name: str
    description: str | None

class ProjectResponse(ProjectCreate):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
