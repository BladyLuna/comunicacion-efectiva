# 💬 Comunicación Efectiva

Aplicación web educativa sobre **comunicación efectiva**, desarrollada para la
**Convocatoria a Actividad de Desarrollo de Aplicaciones Web — Gestión 2026**
de la asignatura *Diseño y Programación Web III*.

Instituto Técnico Nacional de Comercio «Federico Álvarez Plata» — Nocturno
Carrera de Sistemas Informáticos

**Autor:** Bladimir Luna Corrales
**Temática elegida:** 5 — Comunicación efectiva

---

## Secciones exigidas por la convocatoria

| Convocatoria | Ruta | Implementación |
|---|---|---|
| **A. Inicio y presentación** | `/` | Hero, objetivo del sitio, mensajes clave, estadísticas en vivo desde la BD y accesos directos al material y al quiz |
| **B. Sección informativa** | `/contenido` | 8 artículos educativos en acordeón con filtro por categoría + 6 recursos externos de consulta |
| **C. Quiz interactivo** | `/quiz` | 15 preguntas almacenadas en PostgreSQL, registro de respuestas, cálculo de puntuación y resultados explicados |
| **D. Desarrolladores** | `/desarrolladores` | Equipo, propósito, tecnologías, funcionalidades implementadas, arquitectura y créditos |
| *(extra)* Ranking | `/ranking` | Mejores puntuaciones consultadas desde la base de datos |

---

## Arquitectura: features verticales

El código se organiza **por funcionalidad**, no por tipo de archivo. Cada feature es
autocontenida y expone su contrato a través de un barrel `index.ts`:

```
src/
├── app/                              # Rutas (App Router)
│   ├── page.tsx                      # A · Inicio
│   ├── contenido/page.tsx            # B · Informativa
│   ├── quiz/page.tsx                 # C · Quiz
│   ├── ranking/page.tsx              #     Ranking
│   ├── desarrolladores/page.tsx      # D · Desarrolladores
│   └── api/quiz/
│       ├── route.ts                  # GET  — preguntas
│       ├── intentos/route.ts         # POST — registrar intento
│       └── ranking/route.ts          # GET  — ranking
│
├── features/
│   ├── quiz/
│   │   ├── shared/schemas/           # Esquemas Zod (contrato cliente ↔ servidor)
│   │   ├── shared/types/             # Tipos TypeScript públicos
│   │   ├── backend/dto/              # Entidad BD → forma pública (oculta `esCorrecta`)
│   │   ├── backend/services/         # Lógica de negocio + Prisma
│   │   ├── backend/controllers/      # Validación HTTP y delegación
│   │   ├── frontend/views/           # QuizView (componente cliente)
│   │   └── index.ts
│   ├── contenido/
│   ├── inicio/
│   └── desarrolladores/
│
└── shared/
    ├── lib/prisma.ts                 # Cliente Prisma (singleton)
    ├── lib/api.ts                    # Respuestas uniformes { ok, data } / { ok, error }
    └── components/                   # Navbar y Footer
```

**Flujo de una petición:** `route.ts` → `controller` (valida con Zod) → `service`
(consulta Prisma) → `dto` (mapea a forma pública) → respuesta JSON.

---

## Modelo de datos

```
Articulo         Recurso          Desarrollador     Tecnologia
   │
Pregunta ──1:N──► Opcion
   │                 │
   └──────┐    ┌─────┘
          ▼    ▼
Intento ──1:N──► Respuesta
```

- `Pregunta` guarda enunciado, explicación educativa, categoría y dificultad.
- `Opcion` marca cuál es la correcta — **ese campo nunca se envía al navegador**.
- `Intento` registra participante, puntaje, porcentaje, nivel y duración.
- `Respuesta` almacena una fila por cada pregunta contestada.

---

## Decisiones técnicas destacadas

- **Corrección del lado del servidor.** La API entrega las opciones sin indicar cuál es
  la correcta; la comparación ocurre en `quiz.service.ts` contra la base de datos, de modo
  que el resultado no puede manipularse desde el cliente.
- **Mezcla aleatoria (Fisher-Yates).** Cada intento presenta las preguntas en distinto orden.
- **Validación en la frontera.** Todo payload entrante se valida con Zod; los datos
  malformados reciben `422` con el detalle por campo.
- **Respuestas uniformes.** Toda la API responde `{ ok: true, data }` o `{ ok: false, error }`.
- **Mobile-first.** Menú colapsable, tablas que se transforman en tarjetas en pantallas
  pequeñas, foco visible y soporte de `prefers-reduced-motion`.

---

## API

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/quiz?limite=10` | Preguntas activas, barajadas, sin revelar la respuesta correcta |
| `POST` | `/api/quiz/intentos` | Corrige el intento, lo persiste y devuelve el resultado con explicaciones |
| `GET` | `/api/quiz/ranking?limite=10` | Mejores puntuaciones registradas |

Ejemplo de envío:

```json
{
  "participante": "María Fernández",
  "duracionSeg": 180,
  "respuestas": [{ "preguntaId": 1, "opcionId": 2 }]
}
```

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend | Route Handlers de Next.js, Zod |
| Base de datos | PostgreSQL + Prisma ORM 7 (migraciones versionadas) |
| Despliegue | Vercel + Neon (Postgres serverless) |

---

## Ejecución local

```bash
pnpm install

# Configurar la conexión a PostgreSQL
cp .env.example .env     # y editar DATABASE_URL

pnpm prisma migrate dev  # crea las tablas
pnpm prisma generate     # genera el cliente tipado
pnpm exec tsx prisma/seed.ts   # carga artículos, recursos y preguntas

pnpm dev                 # http://localhost:3000
```

## Despliegue

1. Crear una base de datos en [Neon](https://neon.tech) y copiar su cadena de conexión.
2. Importar el repositorio en [Vercel](https://vercel.com).
3. Definir la variable de entorno `DATABASE_URL` con la cadena de Neon.
4. Desplegar. El script `postinstall` ejecuta `prisma generate` automáticamente.
5. Aplicar migraciones y seed contra Neon:
   `DATABASE_URL="<cadena-neon>" pnpm prisma migrate deploy && DATABASE_URL="<cadena-neon>" pnpm exec tsx prisma/seed.ts`

---

© 2026 · Bladimir Luna Corrales
