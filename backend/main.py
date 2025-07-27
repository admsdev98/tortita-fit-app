from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import mcp, recipes

app = FastAPI()

CORS_ORIGINS = [    
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router)
app.include_router(mcp.router)