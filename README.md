# Tortita Fit App

## Descripción

Tu Tortita Fit nace de la idea de combiar la comida rapida, con la camida procesada de las famosas fast-food.

Lo más interesante de este proyecto, esta en una arquitectura basada en agentes, subagentes y el protocolo MCP, lo que hace que se generen diariamente nuevas recetas, junto a la información nutricional, listado de ingredientes, generación de imagenes y más cosas con el menor código posible.

Esto es un proyecto que ha servido para practicar la funcionalidad de agentes/subagents de OpenAI.

## Características

- Generación automática de recetas e imagenes con IA bajo el protocolo MCP
- Cálculo de calorías y macronutrientes por receta.

## Flujo

- Se genera un proceso diario para generar recetas.
- Se "activa" el orquestador, el cual es un chef que se encargara de gestionar la creación de toda la receta.

Para generar esta receta:

1. El chef, busca una receta que servira de referencia.
2. Empieza a llamara los diferentes subagentes mediante las tools que hemos indicado.
3. Cada subagente, tiene su propio contexto, el cual sirve para que ejecute una accion determinada.
4. Cada vez que un "subagente" genera una parte de la receta, el chef principal, se encarga de ir almacenando y validando la información.
5. Una vez que tiene todos los datos necesarios, inserta la receta.

## Tecnologías Utilizadas

**Backend**  
Python / FastAPI / OpenAI / SQLModel

**Frontend**  
React / Vite / TailwindCSS / HTTPX

**IA**  
OpenAI GPT / Multi-Agent Orchestration (MCP)

**Infraestructura**  
Docker
