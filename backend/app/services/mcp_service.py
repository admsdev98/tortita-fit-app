import os
import json

from agents import Agent, Runner

from app.utils.mcp_utils import load_personal_data_file

from app.services.recipe_agent_service import (
    generate_grocery_list,
    generate_recipe_steps,
    generate_recipe_nutritional_info,
    generate_recipe_image,
    translate_recipe_to_spanish,
)

from app.repositories.recipe_repository import (
    create_recipe,
    update_recipe,
)
from app.repositories.recipe_instruction_repository import (
    create_instruction,
    update_instruction,
)


from app.repositories.schema_repository import get_schema_info


async def orchestrate_mcp_flow():
    orchestrator_prompt = load_personal_data_file("chef_agent_prompt") 
    orchestrator_instructions = load_personal_data_file("chef_agent_instructions") 
    
    orchestrator = Agent(
        name="Remy the chef",
        model=os.getenv("OPENAI_MODEL"),
        instructions=orchestrator_instructions,
        tools=[
            generate_grocery_list,
            generate_recipe_steps,
            generate_recipe_nutritional_info,
            generate_recipe_image,
            translate_recipe_to_spanish,
            get_schema_info,
            create_recipe,
            update_recipe,
            create_instruction,
            update_instruction,
        ]
    )
    
    # result = orchestrator.run(message="Create a new recipe with the details provided")
    result = await Runner.run(orchestrator, orchestrator_prompt)
    return result.final_output
