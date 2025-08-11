import sys
import requests


def generate_new_recipe():
    try:
        response = requests.post(
            'http://localhost:8000/mcp/generate-recipes',
            json={},
            timeout=300
        )
        print(response.text)
        sys.exit(0 if response.ok else 1)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    generate_new_recipe()