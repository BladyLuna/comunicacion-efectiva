"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PreguntaPublica, ResultadoIntento } from "../../shared/types/quiz.types";

type Fase = "bienvenida" | "cargando" | "jugando" | "enviando" | "resultado" | "error";

const ETIQUETA: Record<string, string> = {
  ESCUCHA_ACTIVA: "Escucha activa",
  COMUNICACION_NO_VERBAL: "Comunicación no verbal",
  ASERTIVIDAD: "Asertividad",
  FEEDBACK: "Retroalimentación",
  COMUNICACION_DIGITAL: "Comunicación digital",
  BARRERAS: "Barreras",
};

const COLOR_DIFICULTAD: Record<string, string> = {
  BASICO: "text-acento2 border-acento2/40",
  INTERMEDIO: "text-acento3 border-acento3/40",
  AVANZADO: "text-red-400 border-red-400/40",
};

export function QuizView() {
  const [fase, setFase] = useState<Fase>("bienvenida");
  const [nombre, setNombre] = useState("");
  const [preguntas, setPreguntas] = useState<PreguntaPublica[]>([]);
  const [indice, setIndice] = useState(0);
  const [elecciones, setElecciones] = useState<Record<number, number>>({});
  const [resultado, setResultado] = useState<ResultadoIntento | null>(null);
  const [mensajeError, setMensajeError] = useState("");
  const [inicio, setInicio] = useState(0);
  const [transcurrido, setTranscurrido] = useState(0);

  // Cronómetro del intento
  useEffect(() => {
    if (fase !== "jugando") return;
    const id = setInterval(() => setTranscurrido(Math.floor((Date.now() - inicio) / 1000)), 1000);
    return () => clearInterval(id);
  }, [fase, inicio]);

  const actual = preguntas[indice];
  const respondidas = Object.keys(elecciones).length;
  const progreso = preguntas.length ? Math.round((respondidas / preguntas.length) * 100) : 0;

  const reloj = useMemo(() => {
    const m = String(Math.floor(transcurrido / 60)).padStart(2, "0");
    const s = String(transcurrido % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [transcurrido]);

  async function comenzar() {
    if (nombre.trim().length < 2) {
      setMensajeError("Escribe tu nombre (mínimo 2 caracteres) para registrar tu intento.");
      return;
    }
    setMensajeError("");
    setFase("cargando");
    try {
      const res = await fetch("/api/quiz?limite=10", { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "No se pudieron cargar las preguntas");
      setPreguntas(json.data);
      setIndice(0);
      setElecciones({});
      setInicio(Date.now());
      setTranscurrido(0);
      setFase("jugando");
    } catch (e) {
      setMensajeError(e instanceof Error ? e.message : "Error de conexión");
      setFase("error");
    }
  }

  function elegir(preguntaId: number, opcionId: number) {
    setElecciones((prev) => ({ ...prev, [preguntaId]: opcionId }));
  }

  async function finalizar() {
    setFase("enviando");
    try {
      const respuestas = Object.entries(elecciones).map(([preguntaId, opcionId]) => ({
        preguntaId: Number(preguntaId),
        opcionId,
      }));

      const res = await fetch("/api/quiz/intentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participante: nombre.trim(),
          duracionSeg: transcurrido,
          respuestas,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "No se pudo registrar el intento");
      setResultado(json.data);
      setFase("resultado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setMensajeError(e instanceof Error ? e.message : "Error al enviar");
      setFase("error");
    }
  }

  function reiniciar() {
    setFase("bienvenida");
    setPreguntas([]);
    setElecciones({});
    setResultado(null);
    setIndice(0);
    setTranscurrido(0);
    setMensajeError("");
  }

  // ───────── BIENVENIDA ─────────
  if (fase === "bienvenida" || fase === "cargando" || fase === "error") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="aparecer rounded-3xl border border-borde bg-fondo-suave/60 p-7 sm:p-10">
          <span className="text-xs font-medium uppercase tracking-widest text-acento">
            Quiz interactivo
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            🧠 Evalúa tu comunicación
          </h1>
          <p className="mt-4 leading-relaxed text-tenue">
            10 preguntas recuperadas desde la base de datos. Al terminar verás tu puntuación, tu
            nivel y la explicación de cada respuesta.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-tenue">
            {[
              "Las preguntas se mezclan en cada intento",
              "Puedes navegar entre preguntas antes de enviar",
              "La corrección se realiza en el servidor",
              "Tu resultado queda registrado en el ranking",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="text-acento2">✓</span> {t}
              </li>
            ))}
          </ul>

          <label htmlFor="nombre" className="mt-8 block text-sm font-semibold">
            Tu nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && comenzar()}
            placeholder="Ej. María Fernández"
            maxLength={60}
            disabled={fase === "cargando"}
            className="mt-2 w-full rounded-xl border border-borde bg-fondo px-4 py-3 text-sm outline-none transition-colors placeholder:text-tenue/60 focus:border-acento disabled:opacity-50"
          />

          {mensajeError && (
            <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
              ⚠ {mensajeError}
            </p>
          )}

          <button
            onClick={comenzar}
            disabled={fase === "cargando"}
            className="mt-6 w-full rounded-xl bg-acento px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-acento/25 transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
          >
            {fase === "cargando" ? "Cargando preguntas…" : "Comenzar el quiz →"}
          </button>
        </div>
      </div>
    );
  }

  // ───────── RESULTADO ─────────
  if (fase === "resultado" && resultado) {
    const color =
      resultado.porcentaje >= 85
        ? "text-acento2"
        : resultado.porcentaje >= 60
          ? "text-acento3"
          : "text-red-400";

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="aparecer rounded-3xl border border-borde bg-gradient-to-br from-fondo-suave to-fondo p-7 text-center sm:p-10">
          <span className="text-5xl">
            {resultado.porcentaje >= 85 ? "🏆" : resultado.porcentaje >= 60 ? "👏" : "📖"}
          </span>
          <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            {resultado.participante}, tu resultado
          </h1>

          <p className={`mt-6 text-6xl font-extrabold ${color}`}>{resultado.porcentaje}%</p>
          <p className="mt-2 text-tenue">
            {resultado.puntaje} de {resultado.total} respuestas correctas
          </p>

          <span className="mt-5 inline-block rounded-full border border-acento/40 bg-acento/10 px-5 py-2 text-sm font-semibold text-acento">
            Nivel: {resultado.nivel}
          </span>

          {/* Barra de progreso */}
          <div className="mt-7 h-2.5 w-full overflow-hidden rounded-full bg-borde">
            <div
              className="h-full rounded-full bg-gradient-to-r from-acento to-acento2 transition-[width] duration-1000"
              style={{ width: `${resultado.porcentaje}%` }}
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-tenue">
            <span>⏱ Tiempo: {Math.floor(resultado.duracionSeg / 60)}m {resultado.duracionSeg % 60}s</span>
            <span>·</span>
            <span>Intento #{resultado.intentoId}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reiniciar}
              className="rounded-xl bg-acento px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              🔄 Intentar de nuevo
            </button>
            <Link
              href="/ranking"
              className="rounded-xl border border-borde bg-fondo-suave px-6 py-3 text-sm font-semibold transition-colors hover:border-acento/50"
            >
              🏅 Ver ranking
            </Link>
            <Link
              href="/contenido"
              className="rounded-xl border border-borde bg-fondo-suave px-6 py-3 text-sm font-semibold transition-colors hover:border-acento2/50"
            >
              📚 Repasar contenido
            </Link>
          </div>
        </div>

        {/* Revisión detallada */}
        <h2 className="mt-12 text-xl font-bold sm:text-2xl">📋 Revisión de tus respuestas</h2>
        <div className="mt-5 space-y-3">
          {resultado.detalle.map((d, i) => (
            <article
              key={d.preguntaId}
              className={`rounded-2xl border p-5 ${
                d.correcta
                  ? "border-acento2/40 bg-acento2/5"
                  : "border-red-500/40 bg-red-500/5"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{d.correcta ? "✅" : "❌"}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-snug">
                    {i + 1}. {d.enunciado}
                  </p>

                  <p className="mt-3 text-sm text-tenue">
                    <span className="font-medium text-texto">Tu respuesta:</span> {d.textoElegido}
                  </p>

                  {!d.correcta && (
                    <p className="mt-1.5 text-sm text-tenue">
                      <span className="font-medium text-acento2">Correcta:</span> {d.textoCorrecto}
                    </p>
                  )}

                  <p className="mt-3 rounded-lg bg-fondo-suave/80 px-3.5 py-2.5 text-sm leading-relaxed text-tenue">
                    💡 {d.explicacion}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // ───────── JUGANDO ─────────
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Barra superior: progreso y reloj */}
      <div className="sticky top-[4.2rem] z-30 rounded-2xl border border-borde bg-fondo/95 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold">
            Pregunta {indice + 1} <span className="text-tenue">de {preguntas.length}</span>
          </span>
          <div className="flex items-center gap-3 text-tenue">
            <span>⏱ {reloj}</span>
            <span className="rounded-full bg-fondo-suave px-2.5 py-0.5 text-xs">
              {respondidas}/{preguntas.length} respondidas
            </span>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-borde">
          <div
            className="h-full rounded-full bg-gradient-to-r from-acento to-acento2 transition-[width] duration-500"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Pregunta actual */}
      {actual && (
        <article key={actual.id} className="aparecer mt-7 rounded-3xl border border-borde bg-fondo-suave/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-acento/40 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-acento">
              {ETIQUETA[actual.categoria] ?? actual.categoria}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                COLOR_DIFICULTAD[actual.dificultad] ?? "text-tenue border-borde"
              }`}
            >
              {actual.dificultad}
            </span>
          </div>

          <h2 className="mt-4 text-lg font-bold leading-snug sm:text-xl">{actual.enunciado}</h2>

          <div className="mt-6 space-y-2.5">
            {actual.opciones.map((o, i) => {
              const seleccionada = elecciones[actual.id] === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => elegir(actual.id, o.id)}
                  className={`flex w-full items-center gap-3.5 rounded-xl border p-4 text-left text-sm transition-all ${
                    seleccionada
                      ? "border-acento bg-acento/10 text-texto"
                      : "border-borde bg-fondo hover:border-acento/50 text-tenue"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      seleccionada ? "bg-acento text-white" : "bg-fondo-suave text-tenue"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-snug">{o.texto}</span>
                </button>
              );
            })}
          </div>
        </article>
      )}

      {/* Navegación */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setIndice((i) => Math.max(0, i - 1))}
          disabled={indice === 0}
          className="rounded-xl border border-borde bg-fondo-suave px-5 py-3 text-sm font-semibold transition-colors hover:border-acento/50 disabled:opacity-40"
        >
          ← Anterior
        </button>

        {indice < preguntas.length - 1 ? (
          <button
            onClick={() => setIndice((i) => Math.min(preguntas.length - 1, i + 1))}
            className="rounded-xl bg-acento px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={finalizar}
            disabled={respondidas === 0 || fase === "enviando"}
            className="rounded-xl bg-acento2 px-6 py-3 text-sm font-semibold text-fondo transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {fase === "enviando" ? "Calculando…" : "✓ Finalizar y ver resultado"}
          </button>
        )}
      </div>

      {/* Navegador rápido de preguntas */}
      <div className="mt-7 flex flex-wrap gap-2">
        {preguntas.map((p, i) => {
          const hecha = elecciones[p.id] !== undefined;
          return (
            <button
              key={p.id}
              onClick={() => setIndice(i)}
              aria-label={`Ir a la pregunta ${i + 1}`}
              className={`h-9 w-9 rounded-lg border text-xs font-bold transition-colors ${
                i === indice
                  ? "border-acento bg-acento text-white"
                  : hecha
                    ? "border-acento2/50 bg-acento2/15 text-acento2"
                    : "border-borde bg-fondo-suave text-tenue hover:border-acento/40"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {respondidas < preguntas.length && (
        <p className="mt-5 text-center text-sm text-tenue">
          Te faltan {preguntas.length - respondidas} preguntas por responder.
        </p>
      )}
    </div>
  );
}
