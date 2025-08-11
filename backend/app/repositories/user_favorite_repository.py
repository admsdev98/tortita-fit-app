from sqlmodel import Session, select
from app.models.user_favorite import UserFavorite

from app.db.db import engine
from agents import function_tool

@function_tool(description_override="Retrieves all user favorites from the database.")
def get_all_favorites():
    with Session(engine) as session:
        favorite = session.exec(select(UserFavorite)).all()
        return favorite

@function_tool(description_override="Retrieves a user favorite by its ID.")
def get_favorite_by_id(id: int):
    with Session(engine) as session:
        favorite = session.exec(select(UserFavorite).where(UserFavorite.id == id)).first()
        return favorite   

@function_tool(description_override="Creates a new user favorite and saves it to the database.")
def create_favorite(favorite: UserFavorite):
    with Session(engine) as session:
        session.add(favorite)
        session.commit()
        session.refresh(favorite)
        return favorite

@function_tool(description_override="Updates an existing user favorite by its ID.")
def update_favorite(favorite_id: int, favorite: UserFavorite):
    with Session(engine) as session:
        session.exec(select(UserFavorite).where(UserFavorite.id == favorite_id)).first()
        session.commit()
        session.refresh(favorite)
        return favorite

@function_tool(description_override="Retrieves all favorites associated with a user by their user ID.")
def get_favorites_by_user_id(user_id: int):
    with Session(engine) as session:
        favorites = session.exec(select(UserFavorite).where(UserFavorite.user_id == user_id)).all()
        return favorites