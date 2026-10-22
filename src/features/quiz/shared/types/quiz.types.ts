/** Opción tal como se expone al cliente (SIN revelar cuál es la correcta). */
export type OpcionPublica = {
  id: number;
  texto: string;
};

/** Pregunta expuesta al cliente para rendir el quiz. */
export type PreguntaPublica = {
  id: number;
  enunciado: string;
  categoria: string;
  dificultad: string;
  opciones: OpcionPublica[];
};

/** Detalle de corrección de una pregunta, devuelto al finalizar el intento. */
export type DetalleCorreccion = {
  preguntaId: number;
  enunciado: string;
  opcionElegidaId: number;
  opcionCorrectaId: number;
  textoElegido: string;
  textoCorrecto: string;
  correcta: boolean;
  explicacion: string;
};

/** Resultado completo del intento. */
export type ResultadoIntento = {
  intentoId: number;
  participante: string;
  puntaje: number;
  total: number;
  porcentaje: number;
  nivel: string;
  duracionSeg: number;
  detalle: DetalleCorreccion[];
};

/** Fila del ranking público. */
export type FilaRanking = {
  posicion: number;
  participante: string;
  puntaje: number;
  total: number;
  porcentaje: number;
  nivel: string;
  creadoEn: string;
};
