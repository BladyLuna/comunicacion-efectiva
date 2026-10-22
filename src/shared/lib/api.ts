import { NextResponse } from "next/server";

/** Respuesta exitosa uniforme: { ok: true, data } */
export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

/** Respuesta de error uniforme: { ok: false, error, detalles? } */
export function fail(error: string, status = 400, detalles?: unknown) {
  return NextResponse.json({ ok: false, error, detalles }, { status });
}
