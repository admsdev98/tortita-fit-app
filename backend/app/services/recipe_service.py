from app.repositories.recipe_repository import get_all_recipes, get_recipe_by_id as get_recipe_by_id_repo, update_recipe_counter
from app.repositories.recipe_instruction_repository import get_instructions_by_recipe_id

def get_recipes():
    try:
        recipes = get_all_recipes()
        
        if not recipes:
            return []
        
        recipes_with_instructions = []
        
        for recipe in recipes:
            print("Vamos a obtener las instrucciones de la receta", recipe.id)
            instructions = get_instructions_by_recipe_id(recipe.id)
            if not instructions:
                instructions = [{
                    "step_number": 1,
                    "instruction_text": "Estamos trabajando en las instrucciones de esta receta."
                }]
            
            recipe_dict = associate_instructions_to_recipe(recipe, instructions)
            recipes_with_instructions.append(recipe_dict)

        return recipes_with_instructions
    except Exception as e:
        print("Error al obtener las recetas", e)
        return []

def get_recipe_by_id(recipe_id: int):
    try:
        recipe = get_recipe_by_id_repo(recipe_id)

        if not recipe:
            return None

        instructions = get_instructions_by_recipe_id(recipe.id)
        if not instructions:
            instructions = [{
                "step_number": 1,
                "instruction_text": "Estamos trabajando en las instrucciones de esta receta."
            }]
        
        recipe_dict = associate_instructions_to_recipe(recipe, instructions)
        
        update_recipe_counter(recipe_id, 1)
        return recipe_dict
    except Exception as e:
        print("Error al obtener la receta", e)
        return None

def associate_instructions_to_recipe(recipe, instructions):
    recipe_dict = recipe.model_dump()
    recipe_dict['instructions'] = instructions
    return recipe_dict