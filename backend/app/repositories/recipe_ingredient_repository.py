from sqlmodel import Session, select
from app.models.recipe_ingredient import RecipeIngredient
from app.db.db import engine
from agents import function_tool

def get_all_ingredients():
    with Session(engine) as session:
        ingredients = session.exec(select(RecipeIngredient)).all()
        return ingredients

def get_ingredients_by_recipe_id(recipe_id: int):
    with Session(engine) as session:
        ingredients = session.exec(select(RecipeIngredient).where(RecipeIngredient.recipe_id == recipe_id)).all()
        return ingredients

@function_tool(description_override="Insert a new ingredient from an associated recipe.")
def create_ingredient(ingredient: RecipeIngredient):
    with Session(engine) as session:
        session.add(ingredient)
        session.commit()
        session.refresh(ingredient)
        return ingredient

@function_tool(description_override="Updates an existing recipe ingredient by its ID.")
def update_ingredient(ingredient_id: int, ingredient: RecipeIngredient):
    with Session(engine) as session:
        session.exec(select(RecipeIngredient).where(RecipeIngredient.id == ingredient_id)).first()
        session.commit()
        session.refresh(ingredient)
        return ingredient
