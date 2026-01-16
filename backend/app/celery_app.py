# app/celery_app.py
from celery import Celery
import os


celery_app = Celery(
    "worker",
    broker=f"amqp://{os.getenv('RABBITMQ_DEFAULT_USER')}:{os.getenv('RABBITMQ_DEFAULT_PASS')}@rabbitmq:5672//",  # matches docker-compose
    backend="rpc://",  # optional, only if you want result backend
    broker_connection_retry_on_startup=True,
)

celery_app.autodiscover_tasks(["app.tasks"])