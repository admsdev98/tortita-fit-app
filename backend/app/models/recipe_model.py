from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Recipe(SQLModel, table=True):
    __tablename__ = "recipes"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=200)
    image: Optional[str] = None
    description: Optional[str] = None
    total_time: Optional[str] = Field(default=None, max_length=20)
    calories: Optional[int] = None
    protein: Optional[float] = Field(default=None)
    carbs: Optional[float] = Field(default=None)
    fat: Optional[float] = Field(default=None)
    category: Optional[str] = Field(default=None, max_length=50)
    subcategory: Optional[str] = Field(default=None, max_length=50)
    difficulty: Optional[str] = Field(default=None, max_length=20)
    is_popular: Optional[bool] = Field(default=False)
    visits: Optional[int] = Field(default=0)
    special_tags: Optional[str] = Field(default=None, max_length=200)
    created_at: Optional[datetime] = Field(default=None)
    updated_at: Optional[datetime] = Field(default=None)
