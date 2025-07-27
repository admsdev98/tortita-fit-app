from sqlmodel import Session, select
from app.models.user_favorite import UserFavorite

from app.db.db import engine

def get_all_favorites():
    with Session(engine) as session:
        favorite = session.exec(select(UserFavorite)).all()
        return favorite

def get_favorite_by_id(id: int):
    with Session(engine) as session:
        favorite = session.exec(select(UserFavorite).where(UserFavorite.id == id)).first()
        return favorite   

def create_favorite(favorite: UserFavorite):
    with Session(engine) as session:
        session.add(favorite)
        session.commit()
        session.refresh(favorite)
        return favorite

def update_favorite(favorite_id: int, favorite: UserFavorite):
    with Session(engine) as session:
        session.exec(select(UserFavorite).where(UserFavorite.id == favorite_id)).first()
        session.commit()
        session.refresh(favorite)
        return favorite

def get_favorites_by_user_id(user_id: int):
    with Session(engine) as session:
        favorites = session.exec(select(UserFavorite).where(UserFavorite.user_id == user_id)).all()
        return favorites 