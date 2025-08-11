from agents import function_tool

from app.utils.openai_utils import init_openai_client, send_openai_request, generate_openai_image
from app.utils.mcp_utils import load_personal_data_file

import logging
logger = logging.getLogger("app.recipe_agent_service")


@function_tool(description_override="Generates a grocery list for a specific recipe.")
def generate_grocery_list(orquestator_prompt: str):
    logger.info("generate_grocery_list called; prompt_len=%d", len(orquestator_prompt) if orquestator_prompt else 0)
    try:
        openai_client = init_openai_client()
        grocery_agent_context = load_personal_data_file("grocery_agent")
        
        messages = [
            {"role": "system", "content": grocery_agent_context},
            {"role": "user", "content": orquestator_prompt}
        ]
        logger.debug("generate_grocery_list messages prepared")
        
        response = send_openai_request(openai_client, messages)
        logger.info("generate_grocery_list success; response_len=%d", len(response) if response else 0)
        return response

    except ValueError as e:
        logger.exception("generate_grocery_list failed")
        print(f"An error occurred: {e}")
        return None

@function_tool(description_override="Generates the steps from a speciic grocery list.")
def generate_recipe_steps(orquestator_prompt: str):
    logger.info("generate_recipe_steps called; prompt_len=%d", len(orquestator_prompt) if orquestator_prompt else 0)
    try:
        openai_client = init_openai_client()
        steps_agent_context = load_personal_data_file("steps_agent")
        
        messages = [
            {"role": "system", "content": steps_agent_context},
            {"role": "user", "content": orquestator_prompt}
        ]
        logger.debug("generate_recipe_steps messages prepared")
        
        response = send_openai_request(openai_client, messages)
        logger.info("generate_recipe_steps success; response_len=%d", len(response) if response else 0)
        return response

    except ValueError as e:
        logger.exception("generate_recipe_steps failed")
        print(f"An error occurred: {e}")
        return None

@function_tool(description_override="Generates nutritional information for a specific recipe.")
def generate_recipe_nutritional_info(orquestator_prompt: str):
    logger.info("generate_recipe_nutriotional_info called; prompt_len=%d", len(orquestator_prompt) if orquestator_prompt else 0)
    try:
        openai_client = init_openai_client()
        nutritional_agent_context = load_personal_data_file("nutrition_agent")

        messages = [
            {"role": "system", "content": nutritional_agent_context},
            {"role": "user", "content": orquestator_prompt}
        ]
        logger.debug("generate_recipe_nutriotional_info messages prepared")
        
        response = send_openai_request(openai_client, messages)
        logger.info("generate_recipe_nutriotional_info success; response_len=%d", len(response) if response else 0)
        return response

    except ValueError as e:
        logger.exception("generate_recipe_nutriotional_info failed")
        print(f"An error occurred: {e}")
        return None
    

@function_tool(description_override="Generates an image for a specific recipe.")
def generate_recipe_image(orquestator_prompt: str):
    try:
        openai_client = init_openai_client()
        response = generate_openai_image(openai_client, orquestator_prompt)
        logger.info("generate_recipe_image success; response_len=%d", len(response) if response else 0)
        return response

    except ValueError as e:
        logger.exception("generate_recipe_image failed")
        print(f"An error occurred: {e}")
        return None

@function_tool(description_override="Translates the recipe content to Spanish while preserving structure, numbers, units, and IDs.")
def translate_recipe_to_spanish(orquestator_prompt: str):
    logger.info("translate_recipe_to_spanish called; prompt_len=%d", len(orquestator_prompt) if orquestator_prompt else 0)
    try:
        openai_client = init_openai_client()
        translator_agent_instructions = load_personal_data_file("translator_agent")

        messages = [
            {"role": "system", "content": translator_agent_instructions},
            {"role": "user", "content": orquestator_prompt}
        ]
        logger.debug("translate_recipe_to_spanish messages prepared")

        response = send_openai_request(openai_client, messages)
        logger.info("translate_recipe_to_spanish success; response_len=%d", len(response) if response else 0)
        return response

    except ValueError as e:
        logger.exception("translate_recipe_to_spanish failed")
        print(f"An error occurred: {e}")
        return None