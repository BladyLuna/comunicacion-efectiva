"use client";

import Link from "next/link";
import { useState } from "react";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/contenido", texto: "Contenido" },
  { href: "/quiz", texto: "Quiz" },
  { href: "/ranking", texto: "Ranking" },
  { href: "/desarrolladores", texto: "Desarrolladores" },
];

export function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borde/80 bg-fondo/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-bold tracking-tight"
          onClick={() => setAbierto(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-acento to-acento2 text-lg shadow-lg shadow-acento/20">
            💬
          </span>
          <span className="hidden sm:inline">
            Comunicación <span className="text-acento2">Efectiva</span>
          </span>
          <span className="sm:hidden">Com. Efectiva</span>
        </Link>

        {/* Navegación de escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-tenue transition-colors hover:bg-fondo-suave hover:text-texto"
              >
                {e.texto}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link
              href="/quiz"
              className="rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-acento/25 transition-transform hover:scale-[1.03]"
            >
              Rendir quiz
            </Link>
          </li>
        </ul>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-label="Abrir menú de navegación"
          className="grid h-10 w-10 place-items-center rounded-lg border border-borde text-texto md:hidden"
        >
          <span className="text-lg">{abierto ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {abierto && (
        <ul className="flex flex-col gap-1 border-t border-borde bg-fondo-suave px-4 py-3 md:hidden">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                onClick={() => setAbierto(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-tenue transition-colors hover:bg-fondo hover:text-texto"
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
