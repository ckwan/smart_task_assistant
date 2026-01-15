# tests/conftest.py
import pytest
from sqlalchemy import text, create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base
from app.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(bind=engine)

@pytest.fixture(scope="session")
def db_engine():
    Base.metadata.create_all(engine)  # create tables
    yield engine
    Base.metadata.drop_all(engine)    # optional cleanup after tests

@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    try:
        yield session  # <- test runs here

        # Cleanup: truncate tables after the test
        session.execute(text("TRUNCATE TABLE users RESTART IDENTITY CASCADE;"))
        session.execute(text("TRUNCATE TABLE projects RESTART IDENTITY CASCADE;"))
        session.execute(text("TRUNCATE TABLE tasks RESTART IDENTITY CASCADE;"))

        session.commit()
    finally:
        session.close()
        transaction.rollback()  # ensures all DB changes are undone
        connection.close()