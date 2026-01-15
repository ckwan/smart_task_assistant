from fastapi import FastAPI
from app.routes import auth, projects, tasks

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(projects.router, tags=["projects"])
app.include_router(tasks.router, tags=["tasks"])

@app.get("/")
def root():
    return {"status": "ok"}
