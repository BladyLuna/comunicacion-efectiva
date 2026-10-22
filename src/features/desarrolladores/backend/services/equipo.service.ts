import { prisma } from "@/shared/lib/prisma";

/** Integrantes del equipo de desarrollo. */
export async function obtenerEquipo() {
  return prisma.desarrollador.findMany({ orderBy: { id: "asc" } });
}

/** Tecnologías utilizadas, agrupadas por categoría. */
export async function obtenerTecnologias() {
  const tecnologias = await prisma.tecnologia.findMany({ orderBy: { orden: "asc" } });
  const grupos = new Map<string, typeof tecnologias>();
  for (const t of tecnologias) {
    const lista = grupos.get(t.categoria) ?? [];
    lista.push(t);
    grupos.set(t.categoria, lista);
  }
  return [...grupos.entries()].map(([categoria, items]) => ({ categoria, items }));
}
