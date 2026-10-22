import type { OpcionPublica, PreguntaPublica } from "../../shared/types/quiz.types";

type OpcionRow = { id: number; texto: string; orden: number };
type PreguntaRow = {
  id: number;
  enunciado: string;
  categoria: string;
  dificultad: string;
  opciones: OpcionRow[];
};

/** Mapea una opción de BD a su forma pública (oculta `esCorrecta`). */
export function toOpcionPublica(o: OpcionRow): OpcionPublica {
  return { id: o.id, texto: o.texto };
}

/**
 * Mapea una pregunta de BD a su forma pública.
 * Nunca expone qué opción es la correcta: la corrección ocurre en el servidor.
 */
export function toPreguntaPublica(p: PreguntaRow): PreguntaPublica {
  return {
    id: p.id,
    enunciado: p.enunciado,
    categoria: p.categoria,
    dificultad: p.dificultad,
    opciones: [...p.opciones].sort((a, b) => a.orden - b.orden).map(toOpcionPublica),
  };
}
