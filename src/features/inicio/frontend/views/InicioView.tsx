import Link from "next/link";

type Props = {
  estadisticas: { totalPreguntas: number; totalIntentos: number; promedioPorcentaje: number };
  destacados: { slug: string; titulo: string; resumen: string; icono: string }[];
};

const pilares = [
  { icono: "👂", titulo: "Escucha activa", texto: "Atender para comprender, no para responder." },
  { icono: "⚖️", titulo: "Asertividad", texto: "Decir lo que necesitas sin agredir ni callar." },
  { icono: "🙌", titulo: "Lenguaje no verbal", texto: "Que el cuerpo confirme lo que dicen las palabras." },
  { icono: "🔄", titulo: "Retroalimentación", texto: "Describir conductas, no etiquetar personas." },
];

export function InicioView({ estadisticas, destacados }: Props) {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20">
        <div className="aparecer">
          <span className="inline-flex items-center gap-2 rounded-full border border-borde bg-fondo-suave px-3.5 py-1.5 text-xs font-medium text-tenue">
            <span className="h-1.5 w-1.5 rounded-full bg-acento2" />
            Convocatoria 2026 · Temática: Comunicación efectiva
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Comunicar bien no es hablar bonito:{" "}
            <span className="bg-gradient-to-r from-acento via-acento2 to-acento3 bg-clip-text text-transparent">
              es que te entiendan
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-tenue sm:text-lg">
            Esta plataforma reúne los fundamentos de la comunicación efectiva —escucha activa,
            asertividad, lenguaje no verbal, retroalimentación y comunicación digital— y te permite
            poner a prueba lo aprendido con un quiz interactivo cuyas preguntas provienen de una
            base de datos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quiz"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-acento px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-acento/25 transition-transform hover:scale-[1.02]"
            >
              🧠 Rendir el quiz
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/contenido"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-borde bg-fondo-suave px-6 py-3.5 text-sm font-semibold text-texto transition-colors hover:border-acento/50"
            >
              📚 Ver material informativo
            </Link>
          </div>
        </div>

        {/* Estadísticas en vivo desde la BD */}
        <dl className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { k: "Preguntas en la base de datos", v: estadisticas.totalPreguntas, c: "text-acento" },
            { k: "Intentos registrados", v: estadisticas.totalIntentos, c: "text-acento2" },
            { k: "Promedio de aciertos", v: `${estadisticas.promedioPorcentaje}%`, c: "text-acento3" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-borde bg-fondo-suave/60 p-5 backdrop-blur"
            >
              <dd className={`text-3xl font-extrabold ${s.c}`}>{s.v}</dd>
              <dt className="mt-1 text-sm text-tenue">{s.k}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ───── OBJETIVO ───── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-borde bg-gradient-to-br from-fondo-suave to-fondo p-7 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">🎯 Objetivo del sitio</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-tenue">
            Fortalecer las competencias de comunicación efectiva en estudiantes y personas en
            formación, ofreciendo contenido educativo organizado y una herramienta de
            autoevaluación que entrega retroalimentación inmediata y explicada, de modo que cada
            error se convierta en un aprendizaje concreto.
          </p>
        </div>
      </section>

      {/* ───── MENSAJES CLAVE ───── */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">✦ Mensajes clave</h2>
        <p className="mt-2 text-tenue">Cuatro pilares que sostienen toda conversación efectiva.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p) => (
            <article
              key={p.titulo}
              className="group rounded-2xl border border-borde bg-fondo-suave/60 p-6 transition-all hover:-translate-y-1 hover:border-acento/50"
            >
              <span className="text-3xl">{p.icono}</span>
              <h3 className="mt-4 font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tenue">{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───── ACCESO AL MATERIAL ───── */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">📚 Material destacado</h2>
            <p className="mt-2 text-tenue">Contenido recuperado desde la base de datos.</p>
          </div>
          <Link href="/contenido" className="text-sm font-semibold text-acento hover:underline">
            Ver todo el contenido →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {destacados.map((a) => (
            <Link
              key={a.slug}
              href={`/contenido#${a.slug}`}
              className="group rounded-2xl border border-borde bg-fondo-suave/60 p-6 transition-all hover:-translate-y-1 hover:border-acento2/50"
            >
              <span className="text-2xl">{a.icono}</span>
              <h3 className="mt-3 font-semibold group-hover:text-acento2">{a.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tenue">{a.resumen}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-acento/30 bg-gradient-to-br from-acento/10 via-fondo-suave to-acento2/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            ¿Listo para medir tus habilidades?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-tenue">
            {estadisticas.totalPreguntas} preguntas almacenadas en la base de datos. Cada respuesta
            se registra, se corrige en el servidor y recibe una explicación.
          </p>
          <Link
            href="/quiz"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-acento px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-acento/25 transition-transform hover:scale-[1.02]"
          >
            Comenzar el quiz →
          </Link>
        </div>
      </section>
    </>
  );
}
