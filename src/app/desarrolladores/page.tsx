import {
  obtenerEquipo,
  obtenerTecnologias,
} from "@/features/desarrolladores/backend/services/equipo.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Desarrolladores · Comunicación Efectiva",
  description:
    "Equipo de desarrollo, propósito del proyecto, tecnologías utilizadas, funcionalidades implementadas y créditos.",
};

const funcionalidades = [
  {
    icono: "🗄️",
    titulo: "Preguntas desde base de datos",
    texto:
      "El cuestionario no está escrito en el código: las preguntas, opciones y explicaciones se consultan con Prisma ORM desde PostgreSQL en cada intento.",
  },
  {
    icono: "🔀",
    titulo: "Mezcla aleatoria",
    texto:
      "Las preguntas se barajan con el algoritmo Fisher-Yates, de modo que dos intentos consecutivos nunca presentan el mismo orden.",
  },
  {
    icono: "🔒",
    titulo: "Corrección del lado del servidor",
    texto:
      "La API nunca envía al navegador cuál es la opción correcta. La comparación ocurre en el servidor, por lo que el resultado no se puede alterar desde el cliente.",
  },
  {
    icono: "💾",
    titulo: "Registro de respuestas",
    texto:
      "Cada intento guarda su puntuación y una fila por respuesta individual, con la pregunta, la opción elegida y si fue acertada.",
  },
  {
    icono: "💡",
    titulo: "Retroalimentación explicada",
    texto:
      "Al finalizar se muestra pregunta por pregunta la respuesta elegida, la correcta y una explicación educativa del porqué.",
  },
  {
    icono: "🏅",
    titulo: "Ranking de resultados",
    texto:
      "Las puntuaciones se ordenan por porcentaje y, ante empate, por menor tiempo, consultando agregados directamente en la base de datos.",
  },
  {
    icono: "🛡️",
    titulo: "Validación con Zod",
    texto:
      "Todo lo que entra por la API se valida contra un esquema tipado; los datos malformados se rechazan con código 422 y detalle del error.",
  },
  {
    icono: "📱",
    titulo: "Diseño adaptable",
    texto:
      "Interfaz mobile-first con Tailwind CSS: menú colapsable, tablas que se convierten en tarjetas y foco visible para navegación por teclado.",
  },
];

const arquitectura = [
  { capa: "shared/schemas", desc: "Esquemas Zod — contrato de datos compartido entre cliente y servidor" },
  { capa: "shared/types", desc: "Tipos TypeScript expuestos por la feature" },
  { capa: "backend/dto", desc: "Mapea entidades de base de datos a su forma pública" },
  { capa: "backend/services", desc: "Lógica de negocio y acceso a datos con Prisma" },
  { capa: "backend/controllers", desc: "Valida la petición HTTP y delega en el servicio" },
  { capa: "frontend/views", desc: "Componentes React que consumen la API" },
];

export default async function DesarrolladoresPage() {
  const [equipo, tecnologias] = await Promise.all([obtenerEquipo(), obtenerTecnologias()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="aparecer">
        <span className="text-xs font-medium uppercase tracking-widest text-acento">
          Sección de desarrolladores
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          👨‍💻 Quién construyó esto y cómo
        </h1>
      </header>

      {/* Equipo */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">Equipo</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {equipo.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-borde bg-fondo-suave/60 p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-acento to-acento2 text-2xl">
                  {d.avatar}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{d.nombre}</h3>
                  <p className="text-sm font-medium text-acento2">{d.rol}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-tenue">{d.bio}</p>
              {d.github && (
                <a
                  href={d.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-borde px-3.5 py-2 text-xs font-semibold transition-colors hover:border-acento/50"
                >
                  🐙 GitHub ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Propósito */}
      <section className="mt-14">
        <div className="rounded-3xl border border-borde bg-gradient-to-br from-fondo-suave to-fondo p-7 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">🎯 Propósito del proyecto</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-tenue">
            Este sitio responde a la Convocatoria de Desarrollo de Aplicaciones Web de la
            asignatura <strong className="text-texto">Diseño y Programación Web III</strong>,
            bajo la temática <strong className="text-texto">comunicación efectiva</strong>.
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-tenue">
            La comunicación efectiva es una habilidad transversal: sostiene el trabajo en equipo,
            previene conflictos y mejora el desempeño académico y laboral. El aporte educativo del
            proyecto está en transformar ese contenido, que suele quedarse en la teoría, en una
            experiencia donde la persona se autoevalúa y recibe una explicación de cada error.
          </p>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">🧰 Tecnologías utilizadas</h2>
        <div className="mt-6 space-y-6">
          {tecnologias.map((grupo) => (
            <div key={grupo.categoria}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-acento2">
                {grupo.categoria}
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {grupo.items.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-start gap-3.5 rounded-xl border border-borde bg-fondo-suave/60 p-4"
                  >
                    <span className="text-xl">{t.icono}</span>
                    <div>
                      <p className="text-sm font-semibold">{t.nombre}</p>
                      <p className="mt-1 text-sm leading-relaxed text-tenue">{t.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">⚙️ Funcionalidades implementadas</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {funcionalidades.map((f) => (
            <article key={f.titulo} className="rounded-2xl border border-borde bg-fondo-suave/60 p-5">
              <span className="text-2xl">{f.icono}</span>
              <h3 className="mt-3 font-semibold">{f.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tenue">{f.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">🏗️ Arquitectura por features verticales</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-tenue">
          El código se organiza por funcionalidad y no por tipo de archivo: cada feature
          (<code className="rounded bg-fondo-suave px-1.5 py-0.5 text-xs text-acento">quiz</code>,{" "}
          <code className="rounded bg-fondo-suave px-1.5 py-0.5 text-xs text-acento">contenido</code>,{" "}
          <code className="rounded bg-fondo-suave px-1.5 py-0.5 text-xs text-acento">inicio</code>,{" "}
          <code className="rounded bg-fondo-suave px-1.5 py-0.5 text-xs text-acento">desarrolladores</code>)
          contiene su propia capa de datos, lógica y presentación.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-borde">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-borde">
              {arquitectura.map((a) => (
                <tr key={a.capa} className="hover:bg-fondo-suave/50">
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-acento">
                    {a.capa}
                  </td>
                  <td className="px-5 py-3.5 text-tenue">{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Créditos */}
      <section className="mt-14">
        <div className="rounded-3xl border border-borde bg-fondo-suave/60 p-7 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">📜 Créditos</h2>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-tenue">
            <li>
              <strong className="text-texto">Desarrollo, diseño y despliegue:</strong> Bladimir Luna
              Corrales.
            </li>
            <li>
              <strong className="text-texto">Institución:</strong> Instituto Técnico Nacional de
              Comercio «Federico Álvarez Plata» — Nocturno, Carrera de Sistemas Informáticos.
            </li>
            <li>
              <strong className="text-texto">Asignatura:</strong> Diseño y Programación Web III ·
              Gestión 2026.
            </li>
            <li>
              <strong className="text-texto">Contenido educativo:</strong> elaborado a partir de
              marcos de habilidades para la vida (OPS/OMS), Comunicación No Violenta de Marshall
              Rosenberg y bibliografía sobre escucha activa y asertividad.
            </li>
            <li>
              <strong className="text-texto">Tipografía:</strong> Geist Sans y Geist Mono (Vercel).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
