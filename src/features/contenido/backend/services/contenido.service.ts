import { prisma } from "@/shared/lib/prisma";

/** Etiquetas legibles para el enum Categoria. */
export const ETIQUETA_CATEGORIA: Record<string, string> = {
  ESCUCHA_ACTIVA: "Escucha activa",
  COMUNICACION_NO_VERBAL: "Comunicación no verbal",
  ASERTIVIDAD: "Asertividad",
  FEEDBACK: "Retroalimentación",
  COMUNICACION_DIGITAL: "Comunicación digital",
  BARRERAS: "Barreras",
};

/** Todos los artículos educativos, ordenados para la sección informativa. */
export async function obtenerArticulos() {
  const articulos = await prisma.articulo.findMany({ orderBy: { orden: "asc" } });
  return articulos.map((a) => ({
    id: a.id,
    slug: a.slug,
    titulo: a.titulo,
    resumen: a.resumen,
    cuerpo: a.cuerpo,
    icono: a.icono,
    categoria: a.categoria as string,
    etiqueta: ETIQUETA_CATEGORIA[a.categoria] ?? a.categoria,
  }));
}

/** Artículos marcados como destacados, para la portada. */
export async function obtenerDestacados() {
  const articulos = await prisma.articulo.findMany({
    where: { destacado: true },
    orderBy: { orden: "asc" },
    take: 4,
  });
  return articulos.map((a) => ({
    slug: a.slug,
    titulo: a.titulo,
    resumen: a.resumen,
    icono: a.icono,
  }));
}

/** Recursos externos de consulta. */
export async function obtenerRecursos() {
  const recursos = await prisma.recurso.findMany({ orderBy: { id: "asc" } });
  return recursos.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    descripcion: r.descripcion,
    url: r.url,
    tipo: r.tipo,
    fuente: r.fuente,
  }));
}
