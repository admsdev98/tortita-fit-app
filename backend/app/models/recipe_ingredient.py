from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class RecipeIngredient(SQLModel, table=True):
    __tablename__ = "recipe_ingredients"
    id: Optional[int] = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipes.id")
    name: str = Field(max_length=100)
    amount: str = Field(max_length=50)
    unit: str = Field(max_length=30)
    created_at: Optional[datetime] = Field(default=None)
    updated_at: Optional[datetime] = Field(default=None)
