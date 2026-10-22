import { prisma } from "@/shared/lib/prisma";
import { toPreguntaPublica } from "../dto/quiz.dto";
import type {
  CrearIntentoInput,
} from "../../shared/schemas/quiz.schema";
import type {
  DetalleCorreccion,
  FilaRanking,
  PreguntaPublica,
  ResultadoIntento,
} from "../../shared/types/quiz.types";

/** Clasifica el desempeño según el porcentaje de aciertos. */
export function calcularNivel(porcentaje: number): string {
  if (porcentaje >= 85) return "Comunicador efectivo";
  if (porcentaje >= 60) return "Competente";
  return "En desarrollo";
}

/** Baraja un arreglo (Fisher-Yates) sin mutar el original. */
function barajar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Recupera las preguntas activas desde la base de datos.
 * @param limite cantidad máxima de preguntas del cuestionario
 */
export async function obtenerPreguntas(limite = 10): Promise<PreguntaPublica[]> {
  const preguntas = await prisma.pregunta.findMany({
    where: { activa: true },
    include: { opciones: true },
  });

  return barajar(preguntas)
    .slice(0, limite)
    .map((p) =>
      toPreguntaPublica({
        id: p.id,
        enunciado: p.enunciado,
        categoria: p.categoria,
        dificultad: p.dificultad,
        opciones: p.opciones,
      }),
    );
}

/**
 * Corrige el intento CONTRA LA BASE DE DATOS (nunca confía en el cliente),
 * persiste el intento y cada respuesta, y devuelve el resultado con explicaciones.
 */
export async function registrarIntento(input: CrearIntentoInput): Promise<ResultadoIntento> {
  const preguntaIds = input.respuestas.map((r) => r.preguntaId);

  const preguntas = await prisma.pregunta.findMany({
    where: { id: { in: preguntaIds } },
    include: { opciones: true },
  });

  if (preguntas.length === 0) {
    throw new Error("Ninguna de las preguntas enviadas existe en la base de datos");
  }

  const porId = new Map(preguntas.map((p) => [p.id, p]));
  const detalle: DetalleCorreccion[] = [];
  const paraPersistir: { preguntaId: number; opcionId: number; correcta: boolean }[] = [];

  for (const r of input.respuestas) {
    const pregunta = porId.get(r.preguntaId);
    if (!pregunta) continue;

    const elegida = pregunta.opciones.find((o) => o.id === r.opcionId);
    const correcta = pregunta.opciones.find((o) => o.esCorrecta);
    if (!elegida || !correcta) continue;

    const acerto = elegida.esCorrecta;
    detalle.push({
      preguntaId: pregunta.id,
      enunciado: pregunta.enunciado,
      opcionElegidaId: elegida.id,
      opcionCorrectaId: correcta.id,
      textoElegido: elegida.texto,
      textoCorrecto: correcta.texto,
      correcta: acerto,
      explicacion: pregunta.explicacion,
    });
    paraPersistir.push({ preguntaId: pregunta.id, opcionId: elegida.id, correcta: acerto });
  }

  if (paraPersistir.length === 0) {
    throw new Error("Las respuestas enviadas no corresponden a opciones válidas");
  }

  const total = paraPersistir.length;
  const puntaje = paraPersistir.filter((r) => r.correcta).length;
  const porcentaje = Math.round((puntaje / total) * 100);
  const nivel = calcularNivel(porcentaje);

  const intento = await prisma.intento.create({
    data: {
      participante: input.participante,
      puntaje,
      total,
      porcentaje,
      nivel,
      duracionSeg: input.duracionSeg,
      respuestas: { create: paraPersistir },
    },
  });

  return {
    intentoId: intento.id,
    participante: intento.participante,
    puntaje,
    total,
    porcentaje,
    nivel,
    duracionSeg: intento.duracionSeg,
    detalle,
  };
}

/** Devuelve el ranking de los mejores intentos registrados. */
export async function obtenerRanking(limite = 10): Promise<FilaRanking[]> {
  const intentos = await prisma.intento.findMany({
    orderBy: [{ porcentaje: "desc" }, { duracionSeg: "asc" }, { creadoEn: "asc" }],
    take: limite,
  });

  return intentos.map((i, idx) => ({
    posicion: idx + 1,
    participante: i.participante,
    puntaje: i.puntaje,
    total: i.total,
    porcentaje: i.porcentaje,
    nivel: i.nivel,
    creadoEn: i.creadoEn.toISOString(),
  }));
}

/** Estadísticas globales para mostrar en la portada. */
export async function obtenerEstadisticas() {
  const [totalPreguntas, totalIntentos, agregado] = await Promise.all([
    prisma.pregunta.count({ where: { activa: true } }),
    prisma.intento.count(),
    prisma.intento.aggregate({ _avg: { porcentaje: true } }),
  ]);

  return {
    totalPreguntas,
    totalIntentos,
    promedioPorcentaje: Math.round(agregado._avg.porcentaje ?? 0),
  };
}
