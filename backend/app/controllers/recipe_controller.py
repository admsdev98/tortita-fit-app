from app.services.recipe_service import get_recipes, get_recipe_by_id

def process_recipes():
    return get_recipes()

def process_recipe_id(id: int):
    return get_recipe_by_id(id)