import { ContenidoView } from "@/features/contenido/frontend/views/ContenidoView";
import {
  obtenerArticulos,
  obtenerRecursos,
} from "@/features/contenido/backend/services/contenido.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sección informativa · Comunicación Efectiva",
  description:
    "Contenido educativo sobre escucha activa, asertividad, comunicación no verbal, retroalimentación, comunicación digital y barreras comunicativas.",
};

export default async function ContenidoPage() {
  const [articulos, recursos] = await Promise.all([obtenerArticulos(), obtenerRecursos()]);
  return <ContenidoView articulos={articulos} recursos={recursos} />;
}
