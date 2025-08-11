from sqlalchemy import inspect

from app.db.db import engine
from agents import function_tool

@function_tool(description_override="Retrieves database tables schema information.")
def get_schema_info():
    inspector = inspect(engine)
    table_names = inspector.get_table_names()
    tables = {}
    
    for table_name in table_names:
        columns = inspector.get_columns(table_name)
        primary_keys = inspector.get_pk_constraint(table_name)
        foreign_keys = inspector.get_foreign_keys(table_name)
        
        tables[table_name] = {
            "columns": columns,
            "primary_keys": primary_keys,
            "foreign_keys": foreign_keys
        }
    if not tables:
        return "No tables found in the database."
    return tables