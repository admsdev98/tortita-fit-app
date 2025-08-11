from app.services.mcp_service import orchestrate_mcp_flow


async def process_mcp_message():
    return await orchestrate_mcp_flow()