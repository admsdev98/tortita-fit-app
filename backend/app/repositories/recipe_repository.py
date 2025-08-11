from sqlmodel import Session, select
from app.models.recipe_model import Recipe

from app.db.db import engine
from agents import function_tool

def get_all_recipes():
    with Session(engine) as session:
        recipe = session.exec(select(Recipe)).all()
        return recipe

def get_recipe_by_id(id: int):
    with Session(engine) as session:
        recipe = session.exec(select(Recipe).where(Recipe.id == id)).first()
        return recipe   

@function_tool(description_override="Creates a new recipe and saves it to the database.")
def create_recipe(recipe: Recipe):
    with Session(engine) as session:
        session.add(recipe)
        session.commit()
        session.refresh(recipe)
        return recipe

@function_tool(description_override="Updates an existing recipe by its ID.")
def update_recipe(recipe_id: int, recipe: Recipe):
    with Session(engine) as session:
        session.exec(select(Recipe).where(Recipe.id == recipe_id)).first()
        session.commit()
        session.refresh(recipe)
        return recipe

def update_recipe_counter(recipe_id: int, value: int):
    with Session(engine) as session:
        recipe = session.exec(select(Recipe).where(Recipe.id == recipe_id)).first()
        if recipe:
            recipe.visits += value
            session.commit()
            session.refresh(recipe)
        return recipe

