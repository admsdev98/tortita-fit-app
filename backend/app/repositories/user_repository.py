from sqlmodel import Session, select
from app.models.user import User

from app.db.db import engine

def get_all_users():
    with Session(engine) as session:
        user = session.exec(select(User)).all()
        return user

def get_user_by_id(id: int):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.id == id)).first()
        return user   

def create_user(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

def update_user(user_id: int, user: User):
    with Session(engine) as session:
        session.exec(select(User).where(User.id == user_id)).first()
        session.commit()
        session.refresh(user)
        return user

def get_user_by_email(email: str):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        return user 