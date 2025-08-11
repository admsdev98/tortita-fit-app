import os

from openai import OpenAI

def init_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    organization_key = os.getenv("OPENAI_ORGANIZATION_API_KEY")
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables.")

    return OpenAI(api_key=api_key, organization=organization_key)

def send_openai_request(client, message):    
    try:
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL"),
            messages=message,
            max_tokens=1500,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        raise ValueError(f"An error occurred trying to send a request to OpenAI: {e}")
    
def generate_openai_image(client, prompt):
    try:
        response = client.images.generate(
            model=os.getenv("OPENAI_IMAGE_MODEL"),
            prompt=prompt,
            size="1024x1024",
            response_format="url"
        )
        return response.data[0].url
    except Exception as e:
        raise ValueError(f"An error occurred trying to generate an image with OpenAI: {e}")