from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token

# --------------------------
# CREATE USER
# --------------------------
def create_user(db: Session, name: str, email: str, password: str):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return None  # user exists
    hashed_pw = hash_password(password)
    user = User(name=name, email=email, password_hash=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# --------------------------
# AUTHENTICATE USER
# --------------------------
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

# --------------------------
# CREATE JWT TOKEN
# --------------------------
def generate_token(user: User):
    token_data = {"sub": str(user.id), "email": user.email}
    return create_access_token(token_data)
