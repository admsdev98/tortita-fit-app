# Tu Tortita Fit - Frontend

Frontend de la aplicación Tu Tortita Fit desarrollado con React, Vite y Tailwind CSS.

## 🚀 Características

- **React 18** con hooks modernos
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Framer Motion** para animaciones
- **Axios** para llamadas a la API
- **Responsive Design** para mobile y desktop

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes (Navigation, PageTransition)
│   ├── header/         # Headers específicos de cada página
│   ├── home/           # Componentes de la página de inicio
│   └── recipes/        # Componentes relacionados con recetas
├── data/               # Datos mock (temporal)
│   └── mock/          # Datos de ejemplo
├── hooks/              # Hooks personalizados
├── pages/              # Páginas principales
├── services/           # Servicios para llamadas a la API
├── utils/              # Utilidades y constantes
└── assets/             # Imágenes y recursos estáticos
```

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd tortita-fit-app/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con la URL de tu API
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🌐 Páginas

- **/** - Página de inicio con presentación
- **/recipes** - Lista de recetas con filtros y búsqueda
- **/recipe/:id** - Detalle de receta con pasos de elaboración

## 🔌 Conexión con Backend

El frontend está preparado para conectarse con un backend FastAPI. Los servicios están configurados en:

- `src/services/api.js` - Configuración base de Axios
- `src/services/recipesService.js` - Servicios específicos para recetas
- `src/hooks/useRecipes.js` - Hook para manejar estado de recetas

## 📱 Responsive Design

La aplicación está optimizada para:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Componentes Principales

### Navigation
Menú hamburguesa responsive con navegación entre páginas.

### RecipeFilter
Filtros y búsqueda de recetas con modales en desktop.

### RecipeElaboration
Carrusel interactivo para mostrar pasos de elaboración.

### RecipesGrid
Grid responsivo para mostrar las recetas.

## 🔄 Estado de la Aplicación

- **Mock Data**: Actualmente usa datos de ejemplo en `src/data/mock/`
- **API Ready**: Preparado para conectar con backend FastAPI
- **Hooks**: Hooks personalizados para manejo de estado

## 🚀 Próximos Pasos

1. Conectar con backend FastAPI
2. Implementar autenticación
3. Añadir funcionalidad de favoritos
4. Implementar calculadora de macros
5. Añadir sistema de valoraciones

## 📝 Notas de Desarrollo

- Los datos mock se pueden eliminar una vez conectado con el backend
- Los servicios están preparados para manejar errores de API
- El diseño es completamente responsive
- Las animaciones usan Framer Motion para mejor UX 