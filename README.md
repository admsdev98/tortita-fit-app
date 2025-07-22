# Tu Tortita Fit

Una aplicación web de recetas saludables con calculadora de calorías que usa IA para generar contenido diario.

## Stack Tecnológico

- **Backend**: Python + FastAPI
- **Frontend**: React + Tailwind CSS + Vite
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **IA**: OpenAI API / Claude API
- **Containerización**: Docker

## Estructura del Proyecto

```
tu-tortita-fit/
├── backend/                 # API REST con FastAPI
│   ├── app/                # Aplicación principal
│   ├── models/             # Modelos de base de datos
│   ├── services/           # Lógica de negocio
│   └── utils/              # Utilidades y helpers
├── frontend/               # Interfaz de usuario con React
│   ├── public/             # Archivos estáticos
│   └── src/
│       ├── components/     # Componentes React
│       │   ├── common/     # Componentes reutilizables
│       │   ├── recipes/    # Componentes de recetas
│       │   └── calculator/ # Calculadora de calorías
│       ├── pages/          # Páginas principales
│       ├── hooks/          # Custom hooks
│       ├── services/       # Servicios API
│       └── utils/          # Utilidades frontend
├── db/                     # Scripts y migraciones de BD
└── scripts/                # Scripts de automatización
```

## Instalación

### Requisitos Previos
- Python 3.9+
- Node.js 18+
- npm o yarn

### Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Crear y activar entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar variables de entorno:
```bash
cp ../.env.example .env
# Editar .env con tus claves de API
```

5. Ejecutar servidor de desarrollo:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

## Variables de Entorno Necesarias

Copia `.env.example` a `.env` y configura las siguientes variables:

- `OPENAI_API_KEY`: Clave de API de OpenAI
- `ANTHROPIC_API_KEY`: Clave de API de Claude
- `DATABASE_URL`: URL de conexión a la base de datos
- `SECRET_KEY`: Clave secreta para autenticación
- `ALLOWED_ORIGINS`: URLs permitidas para CORS

## Comandos Básicos

### Backend
```bash
# Ejecutar servidor de desarrollo
uvicorn app.main:app --reload

# Ejecutar migraciones
alembic upgrade head

# Crear nueva migración
alembic revision --autogenerate -m "descripción"
```

### Frontend
```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Funcionalidades Principales

- Página de inicio
- Lista de recetas con imágenes
- Calculadora de calorías
- Generación diaria automática de recetas con IA
- Sugerencias de recetas complementarias

## Desarrollo

El proyecto está configurado para desarrollo local con recarga automática tanto en backend como frontend. El backend corre en `http://localhost:8000` y el frontend en `http://localhost:5173`. 