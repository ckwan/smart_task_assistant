from fastapi import FastAPI
from app.routes import auth, projects, tasks
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5000",
]

app = FastAPI()

app.router.prefix = "/api"
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(projects.router, tags=["projects"])
app.include_router(tasks.router, tags=["tasks"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (dev only!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"status": "ok"}
