from fastapi import APIRouter

router = APIRouter(prefix="/mcp", tags=["mcp"])

@router.post("/messages")
async def handle_message(message: dict):
    return {"message": "Hello World"} 