import os
from pathlib import Path

def load_personal_data_file(agent):
    routes = os.getenv("AGENT_ROUTES")
    if not routes:
        raise EnvironmentError("AGENT_ROUTES environment variable is not set")

    path = Path(routes) / f"{agent}.md"

    if not path.exists():
        raise FileNotFoundError(f"Agent instructions file not found: {path}")   

    with open(path, "r", encoding="utf-8") as file:
        return file.read()