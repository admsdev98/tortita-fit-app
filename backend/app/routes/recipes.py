from fastapi import APIRouter

from app.controllers.recipe_controller import process_recipes, process_recipe_id

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.get("")
def handle_recipes():
    return process_recipes()

@router.get("/{id}")
def handle_recipe_id(id: int):
    return process_recipe_id(id)