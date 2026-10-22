import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-borde bg-fondo-suave/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-base font-bold">
            <span>💬</span> Comunicación Efectiva
          </p>
          <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-tenue">
            Proyecto educativo desarrollado para la Convocatoria de Desarrollo de Aplicaciones
            Web · Diseño y Programación Web III.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-texto">Secciones</p>
          <ul className="mt-3 space-y-2 text-sm text-tenue">
            <li><Link href="/" className="hover:text-acento">Inicio y presentación</Link></li>
            <li><Link href="/contenido" className="hover:text-acento">Sección informativa</Link></li>
            <li><Link href="/quiz" className="hover:text-acento">Quiz interactivo</Link></li>
            <li><Link href="/desarrolladores" className="hover:text-acento">Desarrolladores</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-texto">Institución</p>
          <p className="mt-3 text-sm leading-relaxed text-tenue">
            Instituto Técnico Nacional de Comercio<br />
            «Federico Álvarez Plata» — Nocturno<br />
            Carrera de Sistemas Informáticos<br />
            Gestión 2026
          </p>
        </div>
      </div>

      <div className="border-t border-borde px-4 py-5 text-center text-xs text-tenue sm:px-6">
        © {new Date().getFullYear()} · Desarrollado por Bladimir Luna Corrales · Temática:
        Comunicación efectiva
      </div>
    </footer>
  );
}
