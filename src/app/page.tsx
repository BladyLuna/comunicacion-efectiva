import { InicioView } from "@/features/inicio/frontend/views/InicioView";
import { obtenerEstadisticas } from "@/features/quiz/backend/services/quiz.service";
import { obtenerDestacados } from "@/features/contenido/backend/services/contenido.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [estadisticas, destacados] = await Promise.all([
    obtenerEstadisticas(),
    obtenerDestacados(),
  ]);

  return <InicioView estadisticas={estadisticas} destacados={destacados} />;
}
