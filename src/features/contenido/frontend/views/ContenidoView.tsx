"use client";

import { useMemo, useState } from "react";

type Articulo = {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  cuerpo: string;
  icono: string;
  categoria: string;
  etiqueta: string;
};

type Recurso = {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  tipo: string;
  fuente: string;
};

const COLOR_TIPO: Record<string, string> = {
  VIDEO: "text-acento3 border-acento3/40",
  ARTICULO: "text-acento border-acento/40",
  GUIA: "text-acento2 border-acento2/40",
  PODCAST: "text-tenue border-borde",
};

/** Convierte el markdown ligero del cuerpo (negritas, listas, citas) a JSX. */
function renderCuerpo(cuerpo: string) {
  return cuerpo.split("\n").map((linea, i) => {
    const t = linea.trim();
    if (!t) return <div key={i} className="h-2" />;

    const conNegritas = (texto: string) =>
      texto.split(/(\*\*[^*]+\*\*)/g).map((frag, j) =>
        frag.startsWith("**") && frag.endsWith("**") ? (
          <strong key={j} className="font-semibold text-texto">
            {frag.slice(2, -2)}
          </strong>
        ) : (
          <span key={j}>{frag}</span>
        ),
      );

    if (t.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-3 border-l-2 border-acento bg-acento/5 py-2.5 pl-4 pr-3 text-sm italic leading-relaxed"
        >
          {conNegritas(t.slice(2))}
        </blockquote>
      );
    }
    if (/^[-•]\s/.test(t)) {
      return (
        <p key={i} className="flex gap-2.5 py-1 text-sm leading-relaxed text-tenue">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-acento2" />
          <span>{conNegritas(t.replace(/^[-•]\s/, ""))}</span>
        </p>
      );
    }
    if (/^\d+\.\s/.test(t)) {
      const [num, ...resto] = t.split(/\.\s/);
      return (
        <p key={i} className="flex gap-2.5 py-1 text-sm leading-relaxed text-tenue">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-acento/15 text-[0.7rem] font-bold text-acento">
            {num}
          </span>
          <span>{conNegritas(resto.join(". "))}</span>
        </p>
      );
    }
    return (
      <p key={i} className="py-1 text-sm leading-relaxed text-tenue">
        {conNegritas(t)}
      </p>
    );
  });
}

export function ContenidoView({
  articulos,
  recursos,
}: {
  articulos: Articulo[];
  recursos: Recurso[];
}) {
  const [filtro, setFiltro] = useState<string>("TODAS");
  const [abierto, setAbierto] = useState<number | null>(articulos[0]?.id ?? null);

  const categorias = useMemo(() => {
    const mapa = new Map<string, string>();
    articulos.forEach((a) => mapa.set(a.categoria, a.etiqueta));
    return [...mapa.entries()];
  }, [articulos]);

  const visibles = useMemo(
    () => (filtro === "TODAS" ? articulos : articulos.filter((a) => a.categoria === filtro)),
    [articulos, filtro],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="aparecer">
        <span className="text-xs font-medium uppercase tracking-widest text-acento2">
          Sección informativa
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          📚 Aprende sobre comunicación efectiva
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-tenue">
          Contenido educativo organizado por temas. Toca cualquier tarjeta para desplegar el
          desarrollo completo con ejemplos y recomendaciones prácticas.
        </p>
      </header>

      {/* Filtro por categoría */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFiltro("TODAS")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            filtro === "TODAS"
              ? "border-acento bg-acento text-white"
              : "border-borde bg-fondo-suave text-tenue hover:border-acento/50"
          }`}
        >
          Todas ({articulos.length})
        </button>
        {categorias.map(([valor, etiqueta]) => (
          <button
            key={valor}
            onClick={() => setFiltro(valor)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filtro === valor
                ? "border-acento bg-acento text-white"
                : "border-borde bg-fondo-suave text-tenue hover:border-acento/50"
            }`}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      {/* Artículos en acordeón */}
      <div className="mt-8 space-y-3">
        {visibles.map((a) => {
          const expandido = abierto === a.id;
          return (
            <article
              key={a.id}
              id={a.slug}
              className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-fondo-suave/60 transition-colors ${
                expandido ? "border-acento/50" : "border-borde"
              }`}
            >
              <button
                onClick={() => setAbierto(expandido ? null : a.id)}
                aria-expanded={expandido}
                className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
              >
                <span className="text-2xl sm:text-3xl">{a.icono}</span>
                <span className="flex-1">
                  <span className="block text-[0.7rem] font-medium uppercase tracking-wider text-acento2">
                    {a.etiqueta}
                  </span>
                  <h2 className="mt-1 text-base font-semibold sm:text-lg">{a.titulo}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-tenue">{a.resumen}</p>
                </span>
                <span
                  className={`mt-1 shrink-0 text-tenue transition-transform ${expandido ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {expandido && (
                <div className="border-t border-borde px-5 py-5 sm:px-6">
                  {renderCuerpo(a.cuerpo)}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Recursos de consulta */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">🔗 Recursos de consulta</h2>
        <p className="mt-2 text-tenue">
          Material externo recomendado para profundizar en cada tema.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {recursos.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-borde bg-fondo-suave/60 p-5 transition-all hover:-translate-y-1 hover:border-acento/50"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                    COLOR_TIPO[r.tipo] ?? COLOR_TIPO.PODCAST
                  }`}
                >
                  {r.tipo}
                </span>
                <span className="text-xs text-tenue">{r.fuente}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug group-hover:text-acento">
                {r.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-tenue">{r.descripcion}</p>
              <span className="mt-3 inline-block text-xs font-semibold text-acento">
                Abrir recurso ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
