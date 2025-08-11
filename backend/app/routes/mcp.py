from fastapi import APIRouter
from app.controllers.mcp_controller import process_mcp_message  

router = APIRouter(prefix="/mcp", tags=["mcp"])

@router.post("/messages")
async def handle_message():
    return await process_mcp_message()