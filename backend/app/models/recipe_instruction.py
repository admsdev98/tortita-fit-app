from sqlmodel import SQLModel, Field
from typing import Optional


class RecipeInstruction(SQLModel, table=True):
    __tablename__ = "recipe_instructions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipes.id")
    step_number: int
    instruction_text: str 