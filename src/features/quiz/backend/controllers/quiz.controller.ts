import { ok, fail } from "@/shared/lib/api";
import { crearIntentoSchema } from "../../shared/schemas/quiz.schema";
import {
  obtenerPreguntas,
  obtenerRanking,
  registrarIntento,
} from "../services/quiz.service";

/** GET /api/quiz — entrega las preguntas del cuestionario. */
export async function handleGetPreguntas(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const crudo = Number(searchParams.get("limite") ?? 10);
    const limite = Number.isFinite(crudo) ? Math.min(Math.max(crudo, 1), 30) : 10;

    const preguntas = await obtenerPreguntas(limite);
    return ok(preguntas);
  } catch (e) {
    console.error("[quiz] error al obtener preguntas:", e);
    return fail("No se pudieron recuperar las preguntas", 500);
  }
}

/** POST /api/quiz/intentos — corrige, registra y devuelve el resultado. */
export async function handlePostIntento(req: Request) {
  try {
    const body = await req.json();
    const parsed = crearIntentoSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos inválidos", 422, parsed.error.flatten().fieldErrors);
    }

    const resultado = await registrarIntento(parsed.data);
    return ok(resultado, 201);
  } catch (e) {
    console.error("[quiz] error al registrar intento:", e);
    const mensaje = e instanceof Error ? e.message : "Error al registrar el intento";
    return fail(mensaje, 400);
  }
}

/** GET /api/quiz/ranking — mejores puntuaciones. */
export async function handleGetRanking(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const crudo = Number(searchParams.get("limite") ?? 10);
    const limite = Number.isFinite(crudo) ? Math.min(Math.max(crudo, 1), 50) : 10;

    const ranking = await obtenerRanking(limite);
    return ok(ranking);
  } catch (e) {
    console.error("[quiz] error al obtener ranking:", e);
    return fail("No se pudo recuperar el ranking", 500);
  }
}
