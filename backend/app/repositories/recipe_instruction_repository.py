from sqlmodel import Session, select
from app.models.recipe_instruction import RecipeInstruction

from app.db.db import engine

def get_all_instructions():
    with Session(engine) as session:
        instruction = session.exec(select(RecipeInstruction)).all()
        return instruction

def get_instruction_by_id(id: int):
    with Session(engine) as session:
        instruction = session.exec(select(RecipeInstruction).where(RecipeInstruction.id == id)).first()
        return instruction   

def create_instruction(instruction: RecipeInstruction):
    with Session(engine) as session:
        session.add(instruction)
        session.commit()
        session.refresh(instruction)
        return instruction

def update_instruction(instruction_id: int, instruction: RecipeInstruction):
    with Session(engine) as session:
        session.exec(select(RecipeInstruction).where(RecipeInstruction.id == instruction_id)).first()
        session.commit()
        session.refresh(instruction)
        return instruction

def get_instructions_by_recipe_id(recipe_id: int):
    with Session(engine) as session:
        instructions = session.exec(select(RecipeInstruction).where(RecipeInstruction.recipe_id == recipe_id)).all()
        return instructions 