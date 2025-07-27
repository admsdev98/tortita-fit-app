from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class UserFavorite(SQLModel, table=True):
    __tablename__ = "user_favorites"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    recipe_id: int = Field(foreign_key="recipes.id")
    created_at: Optional[datetime] = Field(default=None) 