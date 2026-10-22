export * from "./shared/schemas/quiz.schema";
export * from "./shared/types/quiz.types";
export {
  obtenerPreguntas,
  obtenerRanking,
  obtenerEstadisticas,
  calcularNivel,
} from "./backend/services/quiz.service";
