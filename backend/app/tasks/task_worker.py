# app/tasks/task_worker.py
import time
import logging
from app.celery_app import celery_app
from app.repositories.task_repo import update_task_status
from app.config import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@celery_app.task(bind=True)
def process_task(self, task_id: int):
    logger.info(f"Worker picked up task {task_id}")

    # simulate processing
    time.sleep(5)

    # update DB
    db = next(get_db())
    updated_task = update_task_status(db, task_id, status="DONE")

    logger.info(f"Task {task_id} processed: {updated_task}")
    return updated_task
