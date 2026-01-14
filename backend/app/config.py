import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt


# -------------------------------------------------------------------
# ENVIRONMENT VARIABLES
# -------------------------------------------------------------------
# Docs: https://12factor.net/config
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://postgres:postgres@db:5432/taskdb")
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key") # Replace with a secure key in production
JWT_ALGORITHM = "HS256"

# -------------------------------------------------------------------
# DATABASE SETUP
# -------------------------------------------------------------------
# SQLAlchemy docs: https://docs.sqlalchemy.org/en/20/orm/session_basics.html
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------------------------------------------------
# AUTH / SECURITY
# -------------------------------------------------------------------
# FastAPI OAuth2 + JWT tutorial: https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/
# PyJWT docs: https://pyjwt.readthedocs.io/en/stable/
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )