# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [v1.2.0] - 2026-02-11 - CRUD de Platos

### Añadido

#### Dashboard
- [018] Página principal del dashboard con estadísticas en tiempo real

#### Gestión de Platos
- [019] APIs CRUD de platos (GET, POST, PATCH, DELETE)
- [020] Vista de lista de platos con filtros por categoría
- [021] Formulario de creación y edición de platos con validación

---

## [v1.1.0] - 2026-02-11 - Dashboard Administrativo

### Añadido

#### Base de Datos
- [012] Configurar Prisma con Supabase PostgreSQL
- [013] Migrar datos de platos a PostgreSQL (seed con 13 platos)

#### Autenticación
- [014] Configurar NextAuth.js v5 con credenciales
- [015] Crear página de login con React Hook Form + Zod
- [016] Implementar middleware de protección para rutas /admin/*

#### Dashboard
- [017] Crear layout del dashboard (sidebar + header)
- [031] Crear páginas placeholder para secciones en construcción

### Credenciales de Prueba
- Email: `admin@restaurante.com`
- Password: `admin123`

---

## [v1.0.0] - 2026-02-11 - Lanzamiento Inicial

### Añadido

#### Sitio Público
- [001] Estructura inicial del proyecto Next.js 16
- [002] Página de inicio con hero y secciones
- [003] Página de menú con filtro por categorías
- [004] Página "Nosotros"
- [005] Página de contacto con formulario
- [006] Header y navegación responsive
- [007] Footer con información del restaurante
- [008] Componente DishCard para mostrar platos
- [009] Datos de platos hardcodeados (13 platos)
- [010] Estilos con Tailwind CSS 4

---

[v1.2.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.2.0
[v1.1.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.1.0
[v1.0.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.0.0
