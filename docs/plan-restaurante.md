# Plan de Mejoras - Restaurante App

> Documento generado: 2026-02-13
> Versión actual: v1.6.0

## Resumen Ejecutivo

Este documento describe las mejoras planificadas para la aplicación de restaurante, organizadas por categoría y prioridad. El objetivo es evolucionar la app hacia una solución más robusta, profesional y fácil de mantener.

---

## 1. Mejoras de UI/UX

### 1.1 Dark Mode
- **Prioridad:** Media
- **Descripción:** Implementar toggle para modo oscuro en toda la aplicación
- **Archivos a modificar:**
  - `src/app/layout.tsx` - Provider de tema
  - `src/components/layout/Header.tsx` - Toggle button
  - `tailwind.config.ts` - Configuración dark mode
  - Todos los componentes con colores hardcodeados
- **Criterios de aceptación:**
  - [ ] Toggle visible en navbar
  - [ ] Preferencia guardada en localStorage
  - [ ] Respeta preferencia del sistema (prefers-color-scheme)
  - [ ] Todos los componentes tienen variantes dark

### 1.2 Loading States (Skeletons)
- **Prioridad:** Alta
- **Descripción:** Mostrar skeletons mientras cargan datos en tablas y cards
- **Archivos a modificar:**
  - `src/components/ui/Skeleton.tsx` - Nuevo componente
  - `src/components/admin/DishesTable.tsx`
  - `src/components/admin/MessagesTable.tsx`
  - `src/components/admin/ReservationsTable.tsx`
  - `src/components/menu/MenuContent.tsx`
- **Criterios de aceptación:**
  - [ ] Skeleton animado para tablas
  - [ ] Skeleton para cards de platos
  - [ ] Skeleton para estadísticas del dashboard

### 1.3 Confirmaciones Modales
- **Prioridad:** Media
- **Descripción:** Reemplazar `confirm()` nativo por modales estilizados
- **Archivos a modificar:**
  - `src/components/ui/ConfirmModal.tsx` - Nuevo componente
  - `src/components/admin/DishesTable.tsx` - handleDelete
  - `src/components/admin/MessagesTable.tsx` - handleDelete
- **Criterios de aceptación:**
  - [ ] Modal con diseño consistente
  - [ ] Botones de confirmar/cancelar
  - [ ] Animación de entrada/salida
  - [ ] Accesible (focus trap, ESC para cerrar)

### 1.4 Búsqueda Global en Admin
- **Prioridad:** Media
- **Descripción:** Buscador global en dashboard para platos, reservaciones y mensajes
- **Archivos a modificar:**
  - `src/components/admin/GlobalSearch.tsx` - Nuevo componente
  - `src/components/admin/Header.tsx` - Integrar búsqueda
  - `src/app/api/search/route.ts` - Nueva API de búsqueda
- **Criterios de aceptación:**
  - [ ] Búsqueda con Cmd/Ctrl+K
  - [ ] Resultados agrupados por tipo
  - [ ] Navegación con teclado
  - [ ] Debounce en input

### 1.5 Notificaciones Push
- **Prioridad:** Baja
- **Descripción:** Alertas en tiempo real para nuevas reservaciones y mensajes
- **Tecnología:** Web Push API o polling con SSE
- **Archivos a modificar:**
  - `src/components/admin/NotificationBell.tsx` - Nuevo componente
  - `src/app/api/notifications/route.ts` - Nueva API
  - Service Worker para push notifications
- **Criterios de aceptación:**
  - [ ] Badge con contador de nuevos
  - [ ] Dropdown con lista de notificaciones
  - [ ] Marcar como leído
  - [ ] Sonido opcional

### 1.6 Drag & Drop para Platos
- **Prioridad:** Baja
- **Descripción:** Reordenar platos destacados arrastrando
- **Tecnología:** @dnd-kit/core o react-beautiful-dnd
- **Archivos a modificar:**
  - `src/components/admin/DishesTable.tsx`
  - `src/app/api/platos/reorder/route.ts` - Nueva API
  - `prisma/schema.prisma` - Campo `order` en Dish
- **Criterios de aceptación:**
  - [ ] Drag handle visible
  - [ ] Preview mientras arrastra
  - [ ] Guardado automático del orden
  - [ ] Funciona en móvil (touch)

---

## 2. Mejoras de Diseño

### 2.1 Galería de Imágenes (Lightbox)
- **Prioridad:** Media
- **Descripción:** Ver imágenes de platos ampliadas en modal
- **Tecnología:** yet-another-react-lightbox o similar
- **Archivos a modificar:**
  - `src/components/ui/Lightbox.tsx` - Nuevo componente
  - `src/components/menu/DishCard.tsx`
  - `src/app/(public)/menu/page.tsx`
- **Criterios de aceptación:**
  - [ ] Click en imagen abre lightbox
  - [ ] Navegación entre imágenes
  - [ ] Zoom y pan
  - [ ] Cerrar con ESC o click fuera

### 2.2 Animaciones con Framer Motion
- **Prioridad:** Baja
- **Descripción:** Transiciones suaves en navegación y componentes
- **Tecnología:** framer-motion
- **Archivos a modificar:**
  - `src/components/ui/AnimatedPage.tsx` - Wrapper
  - `src/components/ui/AnimatedList.tsx` - Para listas
  - Componentes que necesiten animación
- **Criterios de aceptación:**
  - [ ] Page transitions suaves
  - [ ] Animación de entrada en cards
  - [ ] Animación en modales
  - [ ] Respeta prefers-reduced-motion

### 2.3 Iconos Consistentes
- **Prioridad:** Media
- **Descripción:** Usar librería de iconos en vez de emojis
- **Tecnología:** lucide-react (recomendado) o @heroicons/react
- **Archivos a modificar:**
  - `src/components/admin/Sidebar.tsx` - Reemplazar emojis
  - `src/components/admin/StatCard.tsx`
  - Todos los componentes con emojis
- **Criterios de aceptación:**
  - [ ] Iconos SVG consistentes
  - [ ] Tamaños estandarizados
  - [ ] Colores que siguen el tema

### 2.4 Empty States con Ilustraciones
- **Prioridad:** Alta
- **Descripción:** Mostrar ilustraciones cuando no hay datos
- **Archivos a modificar:**
  - `src/components/ui/EmptyState.tsx` - Nuevo componente
  - `src/components/admin/DishesTable.tsx`
  - `src/components/admin/MessagesTable.tsx`
  - `src/components/admin/ReservationsTable.tsx`
- **Criterios de aceptación:**
  - [ ] Ilustración SVG apropiada
  - [ ] Mensaje descriptivo
  - [ ] CTA cuando aplique (ej: "Crear primer plato")

### 2.5 Favicon y Meta Tags (SEO)
- **Prioridad:** Alta
- **Descripción:** SEO básico y Open Graph para compartir
- **Archivos a modificar:**
  - `src/app/layout.tsx` - Metadata
  - `src/app/(public)/menu/page.tsx` - Metadata específica
  - `public/` - Favicons en múltiples tamaños
  - `public/og-image.png` - Imagen para compartir
- **Criterios de aceptación:**
  - [ ] Favicon en múltiples tamaños
  - [ ] Meta description en todas las páginas
  - [ ] Open Graph tags (título, descripción, imagen)
  - [ ] Twitter cards
  - [ ] Structured data (JSON-LD) para restaurante

---

## 3. Mejoras de Funcionalidad

### 3.1 Subida de Imágenes
- **Prioridad:** Alta
- **Descripción:** Upload real de imágenes en vez de URLs
- **Tecnología:** Cloudinary, Supabase Storage, o Vercel Blob
- **Archivos a modificar:**
  - `src/components/admin/ImageUpload.tsx` - Nuevo componente
  - `src/components/admin/DishForm.tsx` - Integrar upload
  - `src/app/api/upload/route.ts` - Nueva API
  - `next.config.ts` - Configurar dominio de imágenes
- **Criterios de aceptación:**
  - [ ] Drag & drop de imagen
  - [ ] Preview antes de subir
  - [ ] Validación de tipo y tamaño
  - [ ] Compresión automática
  - [ ] Fallback a URL manual

### 3.2 Email de Confirmación
- **Prioridad:** Alta
- **Descripción:** Enviar emails de confirmación para reservaciones
- **Tecnología:** Resend (recomendado) o Nodemailer
- **Archivos a modificar:**
  - `src/lib/email.ts` - Servicio de email
  - `src/emails/ReservationConfirmation.tsx` - Template (React Email)
  - `src/app/api/reservaciones/route.ts` - Enviar al crear
  - `src/app/api/reservaciones/[id]/route.ts` - Enviar al confirmar
- **Criterios de aceptación:**
  - [ ] Email al crear reservación
  - [ ] Email al confirmar reservación
  - [ ] Email de recordatorio (24h antes)
  - [ ] Template HTML responsive
  - [ ] Incluir detalles y link de cancelación

### 3.3 Calendario Visual de Reservaciones
- **Prioridad:** Media
- **Descripción:** Vista de calendario para gestionar reservaciones
- **Tecnología:** @fullcalendar/react o react-big-calendar
- **Archivos a modificar:**
  - `src/components/admin/ReservationsCalendar.tsx` - Nuevo componente
  - `src/app/admin/reservaciones/page.tsx` - Toggle vista
  - `src/app/api/reservaciones/route.ts` - Endpoint para rango de fechas
- **Criterios de aceptación:**
  - [ ] Vista mensual, semanal, diaria
  - [ ] Colores por estado
  - [ ] Click para ver detalle
  - [ ] Drag para mover reservación

### 3.4 Export de Datos
- **Prioridad:** Media
- **Descripción:** Descargar reservaciones y mensajes en CSV/Excel
- **Tecnología:** xlsx o csv-stringify
- **Archivos a modificar:**
  - `src/lib/export.ts` - Utilidad de exportación
  - `src/app/api/export/[type]/route.ts` - Nueva API
  - `src/components/admin/ExportButton.tsx` - Nuevo componente
- **Criterios de aceptación:**
  - [ ] Export CSV
  - [ ] Export Excel (.xlsx)
  - [ ] Filtros aplicados al export
  - [ ] Nombre de archivo con fecha

### 3.5 Gestión de Usuarios
- **Prioridad:** Media
- **Descripción:** CRUD de usuarios admin/staff con permisos
- **Archivos a modificar:**
  - `src/app/admin/usuarios/page.tsx` - Nueva página
  - `src/app/api/usuarios/route.ts` - Nueva API
  - `src/components/admin/UsersTable.tsx` - Nuevo componente
  - `src/components/admin/UserForm.tsx` - Nuevo componente
  - `prisma/schema.prisma` - Permisos más granulares
- **Criterios de aceptación:**
  - [ ] Lista de usuarios
  - [ ] Crear/editar usuario
  - [ ] Asignar rol (ADMIN/STAFF)
  - [ ] Desactivar usuario
  - [ ] Solo ADMIN puede gestionar usuarios

### 3.6 Configuración de Horarios
- **Prioridad:** Media
- **Descripción:** Configurar horarios de apertura y días de cierre
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Modelo RestaurantConfig
  - `src/app/admin/configuracion/page.tsx` - Nueva página
  - `src/app/api/config/route.ts` - Nueva API
  - `src/components/reservations/ReservationForm.tsx` - Validar horarios
  - `src/components/layout/Footer.tsx` - Mostrar horarios
- **Criterios de aceptación:**
  - [ ] Horarios por día de la semana
  - [ ] Días festivos/cierre
  - [ ] Validar reservaciones contra horarios
  - [ ] Mostrar horarios en footer

### 3.7 Menú del Día
- **Prioridad:** Baja
- **Descripción:** Sección especial para menú diario/semanal
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Modelo DailyMenu
  - `src/app/admin/menu-del-dia/page.tsx` - Nueva página
  - `src/app/(public)/menu/page.tsx` - Mostrar menú del día
  - `src/components/menu/DailyMenuSection.tsx` - Nuevo componente
- **Criterios de aceptación:**
  - [ ] Crear menú con fecha
  - [ ] Seleccionar platos del catálogo
  - [ ] Precio especial del menú
  - [ ] Visible solo en fecha activa

### 3.8 Código QR del Menú
- **Prioridad:** Baja
- **Descripción:** Generar QR que lleva al menú digital
- **Tecnología:** qrcode.react
- **Archivos a modificar:**
  - `src/components/admin/QRGenerator.tsx` - Nuevo componente
  - `src/app/admin/configuracion/page.tsx` - Sección QR
- **Criterios de aceptación:**
  - [ ] Generar QR con URL del menú
  - [ ] Descargar como PNG/SVG
  - [ ] Personalizar tamaño
  - [ ] Preview en pantalla

---

## 4. Mejoras de Lógica/Backend

### 4.1 Rate Limiting
- **Prioridad:** Alta
- **Descripción:** Proteger APIs públicas contra spam y abuso
- **Tecnología:** @upstash/ratelimit o implementación custom
- **Archivos a modificar:**
  - `src/lib/ratelimit.ts` - Utilidad de rate limiting
  - `src/app/api/reservaciones/route.ts` - Aplicar límite
  - `src/app/api/mensajes/route.ts` - Aplicar límite
  - `src/middleware.ts` - Rate limit global (opcional)
- **Criterios de aceptación:**
  - [ ] Límite por IP
  - [ ] 10 requests/minuto para formularios
  - [ ] Respuesta 429 cuando excede
  - [ ] Headers X-RateLimit-*

### 4.2 Validación de Disponibilidad
- **Prioridad:** Alta
- **Descripción:** Verificar capacidad antes de aceptar reservación
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Campo capacidad en config
  - `src/lib/availability.ts` - Lógica de disponibilidad
  - `src/app/api/reservaciones/route.ts` - Validar antes de crear
  - `src/app/api/availability/route.ts` - Nueva API pública
  - `src/components/reservations/ReservationForm.tsx` - Mostrar slots disponibles
- **Criterios de aceptación:**
  - [ ] Capacidad máxima por hora configurable
  - [ ] Mostrar horas disponibles en formulario
  - [ ] Rechazar si no hay capacidad
  - [ ] Considerar duración de reservación

### 4.3 Soft Delete
- **Prioridad:** Media
- **Descripción:** No eliminar registros, marcarlos como eliminados
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Campo deletedAt en modelos
  - `src/lib/prisma.ts` - Middleware de soft delete
  - Todas las APIs que hacen DELETE
  - Queries para filtrar deletedAt = null
- **Criterios de aceptación:**
  - [ ] Campo deletedAt en Dish, Message, Reservation
  - [ ] DELETE marca deletedAt en vez de borrar
  - [ ] Queries excluyen eliminados por defecto
  - [ ] Opción de restaurar (admin)

### 4.4 Sistema de Auditoría
- **Prioridad:** Media
- **Descripción:** Log de quién modificó qué y cuándo
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Modelo AuditLog
  - `src/lib/audit.ts` - Función de logging
  - Todas las APIs que modifican datos
  - `src/app/admin/auditoria/page.tsx` - Vista de logs
- **Criterios de aceptación:**
  - [ ] Registrar: usuario, acción, entidad, timestamp
  - [ ] Guardar valores antes/después
  - [ ] Vista filtrable por fecha/usuario/acción
  - [ ] Retención configurable

### 4.5 Sistema de Caché
- **Prioridad:** Media
- **Descripción:** Cachear datos frecuentes para mejor rendimiento
- **Tecnología:** Vercel KV, Upstash Redis, o unstable_cache de Next.js
- **Archivos a modificar:**
  - `src/lib/cache.ts` - Utilidades de caché
  - `src/lib/dishes.ts` - Cachear lista de platos
  - `src/lib/stats.ts` - Cachear estadísticas
- **Criterios de aceptación:**
  - [ ] Caché de platos públicos (5 min)
  - [ ] Caché de estadísticas (1 min)
  - [ ] Invalidación al modificar datos
  - [ ] Headers Cache-Control apropiados

### 4.6 Webhooks
- **Prioridad:** Baja
- **Descripción:** Notificar sistemas externos de eventos
- **Archivos a modificar:**
  - `prisma/schema.prisma` - Modelo Webhook
  - `src/lib/webhooks.ts` - Disparar webhooks
  - `src/app/admin/webhooks/page.tsx` - Gestionar webhooks
  - `src/app/api/webhooks/route.ts` - CRUD de webhooks
- **Criterios de aceptación:**
  - [ ] Registrar URL + eventos a escuchar
  - [ ] Disparar en: nueva reservación, confirmación, mensaje
  - [ ] Reintentos con backoff exponencial
  - [ ] Log de entregas

---

## 5. Herramientas de Desarrollo

### 5.1 Testing con Vitest
- **Prioridad:** Alta
- **Descripción:** Testing unitario de componentes y APIs
- **Tecnología:** Vitest + React Testing Library
- **Archivos a crear:**
  - `vitest.config.ts`
  - `src/__tests__/` - Carpeta de tests
  - Tests para validaciones Zod
  - Tests para APIs críticas
  - Tests para componentes UI
- **Criterios de aceptación:**
  - [ ] Vitest configurado
  - [ ] Tests de validaciones (100% coverage)
  - [ ] Tests de APIs (happy path + errores)
  - [ ] Tests de componentes críticos
  - [ ] Script `npm test`

### 5.2 Testing E2E con Playwright
- **Prioridad:** Media
- **Descripción:** Testing end-to-end automatizado
- **Tecnología:** Playwright
- **Archivos a crear:**
  - `playwright.config.ts`
  - `e2e/` - Carpeta de tests E2E
  - Tests de flujos críticos
- **Criterios de aceptación:**
  - [ ] Playwright configurado
  - [ ] Test de login
  - [ ] Test de crear reservación
  - [ ] Test de CRUD platos
  - [ ] CI integration

### 5.3 Storybook
- **Prioridad:** Media
- **Descripción:** Documentar y probar componentes UI aislados
- **Tecnología:** Storybook 8
- **Archivos a crear:**
  - `.storybook/` - Configuración
  - `src/components/**/*.stories.tsx` - Stories
- **Criterios de aceptación:**
  - [ ] Storybook configurado con Tailwind
  - [ ] Stories para componentes UI
  - [ ] Stories para componentes de formulario
  - [ ] Documentación de props
  - [ ] Script `npm run storybook`

### 5.4 Husky + lint-staged
- **Prioridad:** Alta
- **Descripción:** Pre-commit hooks para lint y format
- **Tecnología:** Husky + lint-staged
- **Archivos a crear:**
  - `.husky/pre-commit`
  - `.lintstagedrc.js`
- **Criterios de aceptación:**
  - [ ] Husky instalado
  - [ ] Pre-commit ejecuta lint-staged
  - [ ] ESLint en archivos staged
  - [ ] Prettier en archivos staged
  - [ ] Bloquea commit si hay errores

### 5.5 Prettier
- **Prioridad:** Alta
- **Descripción:** Formateo consistente de código
- **Tecnología:** Prettier
- **Archivos a crear:**
  - `.prettierrc`
  - `.prettierignore`
- **Criterios de aceptación:**
  - [ ] Prettier configurado
  - [ ] Integrado con ESLint
  - [ ] Script `npm run format`
  - [ ] Semicolons: false
  - [ ] Single quotes

### 5.6 GitHub Actions (CI/CD)
- **Prioridad:** Media
- **Descripción:** CI/CD automático
- **Archivos a crear:**
  - `.github/workflows/ci.yml` - Tests y lint
  - `.github/workflows/preview.yml` - Deploy preview (opcional)
- **Criterios de aceptación:**
  - [ ] Lint en cada PR
  - [ ] Tests en cada PR
  - [ ] Build check
  - [ ] Type check
  - [ ] Badge en README

### 5.7 Sentry
- **Prioridad:** Media
- **Descripción:** Monitoreo de errores en producción
- **Tecnología:** @sentry/nextjs
- **Archivos a modificar:**
  - `sentry.client.config.ts`
  - `sentry.server.config.ts`
  - `next.config.ts` - Integrar Sentry
- **Criterios de aceptación:**
  - [ ] Sentry configurado
  - [ ] Captura errores de cliente
  - [ ] Captura errores de servidor
  - [ ] Source maps subidos
  - [ ] Alertas configuradas

### 5.8 Bundle Analyzer
- **Prioridad:** Baja
- **Descripción:** Analizar y optimizar tamaño del bundle
- **Tecnología:** @next/bundle-analyzer
- **Archivos a modificar:**
  - `next.config.ts` - Configurar analyzer
- **Criterios de aceptación:**
  - [ ] Script `npm run analyze`
  - [ ] Reporte visual de bundles
  - [ ] Identificar dependencias pesadas

---

## Roadmap Sugerido

### Fase 1: Fundamentos (Semana 1-2)
- [x] v1.6.0 - Navegación y UX Admin
- [ ] Prettier + Husky (dev tools)
- [ ] Vitest básico
- [ ] Loading States
- [ ] Empty States
- [ ] Favicon y SEO

### Fase 2: Funcionalidad Core (Semana 3-4)
- [ ] Subida de imágenes
- [ ] Email de confirmación
- [ ] Rate limiting
- [ ] Validación de disponibilidad
- [ ] Iconos consistentes

### Fase 3: Experiencia Mejorada (Semana 5-6)
- [ ] Confirmaciones modales
- [ ] Búsqueda global
- [ ] Calendario de reservaciones
- [ ] Export de datos
- [ ] GitHub Actions CI

### Fase 4: Administración Avanzada (Semana 7-8)
- [ ] Gestión de usuarios
- [ ] Horarios del restaurante
- [ ] Soft delete
- [ ] Auditoría
- [ ] Sentry

### Fase 5: Extras (Semana 9+)
- [ ] Dark mode
- [ ] Animaciones
- [ ] Galería lightbox
- [ ] Menú del día
- [ ] QR del menú
- [ ] Notificaciones push
- [ ] Drag & drop
- [ ] Webhooks
- [ ] Storybook
- [ ] Playwright E2E
- [ ] Bundle analyzer
- [ ] Caché avanzado

---

## Notas Técnicas

### Dependencias a Agregar
```bash
# UI/UX
npm i lucide-react framer-motion

# Funcionalidad
npm i resend @react-email/components cloudinary
npm i @fullcalendar/react @fullcalendar/daygrid
npm i xlsx qrcode.react

# Backend
npm i @upstash/ratelimit @upstash/redis

# Dev Tools
npm i -D vitest @testing-library/react
npm i -D playwright @playwright/test
npm i -D prettier eslint-config-prettier
npm i -D husky lint-staged
npm i -D @next/bundle-analyzer
npm i -D @sentry/nextjs
```

### Variables de Entorno Nuevas
```env
# Email (Resend)
RESEND_API_KEY=

# Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Monitoring (Sentry)
SENTRY_DSN=
```

---

*Este documento se actualizará conforme se completen las tareas.*
