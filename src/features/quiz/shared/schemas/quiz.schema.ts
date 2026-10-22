import { z } from "zod";

/** Una respuesta enviada por el participante. */
export const respuestaEnviadaSchema = z.object({
  preguntaId: z.number().int().positive(),
  opcionId: z.number().int().positive(),
});

/** Payload completo del intento que llega al endpoint POST /api/quiz/intentos. */
export const crearIntentoSchema = z.object({
  participante: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "El nombre no puede superar los 60 caracteres"),
  duracionSeg: z.number().int().min(0).max(86_400).default(0),
  respuestas: z
    .array(respuestaEnviadaSchema)
    .min(1, "Debes responder al menos una pregunta")
    .max(50, "Demasiadas respuestas"),
});

export type RespuestaEnviada = z.infer<typeof respuestaEnviadaSchema>;
export type CrearIntentoInput = z.infer<typeof crearIntentoSchema>;
