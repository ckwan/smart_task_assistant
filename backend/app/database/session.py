from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# -------------------------------------------------------------------
# ENVIRONMENT VARIABLES
# -------------------------------------------------------------------
# Docs: https://12factor.net/config
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://postgres:postgres@db:5432/taskdb")

# -------------------------------------------------------------------
# DATABASE SETUP
# -------------------------------------------------------------------
# SQLAlchemy docs: https://docs.sqlalchemy.org/en/20/orm/session_basics.html
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
