# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [v1.6.0] - 2026-02-13 - Mejoras de Navegación y UX Admin

### Added
- [[041]](https://www.notion.so/041-Tablas-Responsive-en-Admin-30614748013a81f9add1d50bd7c4f492) Tablas responsive con paginación y vista de cards en móvil
- [[043]](https://www.notion.so/043-Bot-n-Panel-Admin-en-navbar-p-blico-solo-logueado-30614748013a81099763f0a5666b4d9f) Botón de acceso al Panel Admin en navbar público (solo usuarios autenticados)

### Changed
- [[042]](https://www.notion.so/042-Ocultar-Footer-en-Admin-30614748013a81b2a128d273348f9a4c) Footer oculto en todas las páginas del panel administrativo

---

## [v1.5.0] - 2026-02-13 - Rediseño Visual y Responsive

### Added
- [[033]](https://www.notion.so/033-Sistema-de-Colores-Fase-1-30514748013a814697c0f520de08aa4a) Nuevo sistema de colores con tema rojo
- [[034]](https://www.notion.so/034-Componentes-de-Layout-Fase-2-30514748013a81be987fe1e872b9c01a) Componentes de layout con nuevo esquema de colores
- [[035]](https://www.notion.so/035-P-gina-Principal-Fase-3-30514748013a81ad896cf3f5e7d85c27) HeroSection, NewsletterSection y Breadcrumb reutilizables
- [[036]](https://www.notion.so/036-P-gina-de-Men-Fase-4-30514748013a81e6b427e555d1c927fb) Paginación y breadcrumb en página de menú
- [[037]](https://www.notion.so/037-Otras-P-ginas-P-blicas-Fase-5-30514748013a814396b7e9265670a8b0) Actualización de colores en páginas públicas
- [[038]](https://www.notion.so/038-Admin-Dashboard-Fase-6-30514748013a81c2b2b1ee4f64557211) Actualización de colores en panel administrativo
- [[039]](https://www.notion.so/039-Componentes-UI-Extras-Fase-7-30514748013a8112a706e96a8460e05b) Componente SearchBar con variante hero
- [[040]](https://www.notion.so/040-Admin-Panel-Responsive-30614748013a8140901cc0c9e5c8e8ec) Diseño responsive completo del panel administrativo

### Changed
- Esquema de colores principal de naranja a rojo en toda la aplicación
- Sidebar colapsable con menú hamburguesa en móvil
- Tablas y formularios adaptativos para dispositivos móviles

---

## [v1.4.0] - 2026-02-12 - Estadísticas y Mejoras UX

### Added
- [[029]](https://www.notion.so/029-Implementar-API-de-estadisticas-30414748013a814ba748f5c5e03b8156) API de estadísticas del dashboard con métricas en tiempo real
- [[030]](https://www.notion.so/030-Agregar-notificaciones-y-feedback-30414748013a81f78943cb0f54f0a245) Sistema de notificaciones toast para feedback de acciones

### Fixed
- [[032]](https://www.notion.so/032-Validar-formato-de-telefono-en-reservaciones-30514748013a81b7b2cdcbc4277e5029) Validación de formato de teléfono en formularios de reservación y contacto

---

## [v1.3.0] - 2026-02-12 - Mensajes y Reservaciones

### Added
- [[022]](https://www.notion.so/022-Crear-modelo-y-API-de-mensajes-30414748013a810c8826d0b5e0dfbbfe) API CRUD de mensajes (GET, POST, PATCH, DELETE)
- [[023]](https://www.notion.so/023-Crear-vista-de-lista-de-mensajes-30414748013a816ca702d5bbed0a54b9) Vista de lista de mensajes con filtros por estado
- [[024]](https://www.notion.so/024-Crear-vista-de-detalle-de-mensaje-30414748013a81b186b3fa62adf0f6a8) Vista de detalle de mensaje con gestión de estados
- [[025]](https://www.notion.so/025-Crear-modelo-y-API-de-reservaciones-30414748013a81dab779ce77bb15fad5) API CRUD de reservaciones con filtros por fecha y estado
- [[026]](https://www.notion.so/026-Crear-formulario-publico-de-reservaciones-30414748013a8185934dd7f12ac336c8) Página pública `/reservaciones` con formulario de reserva
- [[027]](https://www.notion.so/027-Crear-vista-de-lista-de-reservaciones-30414748013a81e191d3e42f714af583) Vista de lista de reservaciones en admin con filtros
- [[028]](https://www.notion.so/028-Crear-gestion-de-estado-de-reservaciones-30414748013a81f8bdf7db2a1bd2b92c) Vista de detalle con edición y gestión de estados

---

## [v1.2.0] - 2026-02-11 - CRUD de Platos

### Added
- [[018]](https://www.notion.so/018-Crear-pagina-principal-del-dashboard-30414748013a810aa09ed11944e402da) Página principal del dashboard con estadísticas en tiempo real
- [[019]](https://www.notion.so/019-Crear-APIs-de-platos-30414748013a8148a7e7cef78c50dc77) APIs CRUD de platos (GET, POST, PATCH, DELETE)
- [[020]](https://www.notion.so/020-Crear-vista-de-lista-de-platos-30414748013a8199b591ca7339048c3c) Vista de lista de platos con filtros por categoría
- [[021]](https://www.notion.so/021-Crear-formulario-de-platos-30414748013a81c49f55c4e40025fd38) Formulario de creación y edición de platos con validación

---

## [v1.1.0] - 2026-02-11 - Dashboard Administrativo

### Added
- [[012]](https://www.notion.so/012-Configurar-Prisma-y-Supabase-30414748013a81cd8469d0478bedc77a) Configurar Prisma con Supabase PostgreSQL
- [[013]](https://www.notion.so/013-Migrar-datos-de-platos-a-PostgreSQL-30414748013a815bb1abefbf46161100) Migrar datos de platos a PostgreSQL (seed con 13 platos)
- [[014]](https://www.notion.so/014-Configurar-NextAuth-js-con-credenciales-30414748013a8152b9c3f790c8bb6732) Configurar NextAuth.js v5 con credenciales
- [[015]](https://www.notion.so/015-Crear-pagina-de-login-30414748013a81c0b1f1e326019636fe) Crear página de login con React Hook Form + Zod
- [[016]](https://www.notion.so/016-Implementar-middleware-de-proteccion-30414748013a81398011d70b18858d66) Implementar middleware de protección para rutas /admin/*
- [[017]](https://www.notion.so/017-Crear-layout-del-dashboard-30414748013a81288b38de3fbbfeef32) Crear layout del dashboard (sidebar + header)
- [[031]](https://www.notion.so/031-Crear-paginas-placeholder-para-secciones-del-dashboard-30414748013a8139b788f70aefd39c87) Crear páginas placeholder para secciones en construcción

### Credenciales de Prueba
- Email: `admin@restaurante.com`
- Password: `admin123`

---

## [v1.0.0] - 2026-02-11 - Lanzamiento Inicial

### Added
- Estructura inicial del proyecto Next.js 16
- Página de inicio con hero y secciones
- Página de menú con filtro por categorías
- Página "Nosotros"
- Página de contacto con formulario
- Header y navegación responsive
- Footer con información del restaurante
- Componente DishCard para mostrar platos
- Datos de platos hardcodeados (13 platos)
- Estilos con Tailwind CSS 4

---

[v1.6.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.6.0
[v1.5.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.5.0
[v1.4.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.4.0
[v1.3.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.3.0
[v1.2.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.2.0
[v1.1.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.1.0
[v1.0.0]: https://github.com/Jabbcode/restaurante-app/releases/tag/v1.0.0
