import Link from "next/link";
import { obtenerRanking } from "@/features/quiz/backend/services/quiz.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ranking · Comunicación Efectiva",
  description: "Mejores puntuaciones registradas en el quiz de comunicación efectiva.",
};

const MEDALLA = ["🥇", "🥈", "🥉"];

export default async function RankingPage() {
  const ranking = await obtenerRanking(20);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="aparecer">
        <span className="text-xs font-medium uppercase tracking-widest text-acento3">
          Resultados registrados
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          🏅 Ranking de participantes
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-tenue">
          Cada intento se guarda en la base de datos junto con sus respuestas. Se ordena por
          porcentaje de aciertos y, en caso de empate, por menor tiempo empleado.
        </p>
      </header>

      {ranking.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-borde bg-fondo-suave/60 p-10 text-center">
          <span className="text-4xl">🗒️</span>
          <p className="mt-4 font-semibold">Todavía no hay intentos registrados</p>
          <p className="mt-2 text-sm text-tenue">Sé la primera persona en aparecer en el ranking.</p>
          <Link
            href="/quiz"
            className="mt-6 inline-block rounded-xl bg-acento px-6 py-3 text-sm font-semibold text-white"
          >
            Rendir el quiz →
          </Link>
        </div>
      ) : (
        <>
          {/* Tabla en escritorio */}
          <div className="mt-9 hidden overflow-hidden rounded-2xl border border-borde sm:block">
            <table className="w-full text-sm">
              <thead className="bg-fondo-suave text-left text-xs uppercase tracking-wider text-tenue">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Participante</th>
                  <th className="px-5 py-3.5">Aciertos</th>
                  <th className="px-5 py-3.5">Porcentaje</th>
                  <th className="px-5 py-3.5">Nivel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borde">
                {ranking.map((f) => (
                  <tr key={`${f.posicion}-${f.creadoEn}`} className="hover:bg-fondo-suave/50">
                    <td className="px-5 py-3.5 font-bold text-tenue">
                      {MEDALLA[f.posicion - 1] ?? f.posicion}
                    </td>
                    <td className="px-5 py-3.5 font-medium">{f.participante}</td>
                    <td className="px-5 py-3.5 text-tenue">{f.puntaje}/{f.total}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-borde">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-acento to-acento2"
                            style={{ width: `${f.porcentaje}%` }}
                          />
                        </div>
                        <span className="font-semibold">{f.porcentaje}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-tenue">{f.nivel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas en móvil */}
          <div className="mt-8 space-y-3 sm:hidden">
            {ranking.map((f) => (
              <div
                key={`${f.posicion}-${f.creadoEn}`}
                className="rounded-2xl border border-borde bg-fondo-suave/60 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">{MEDALLA[f.posicion - 1] ?? `#${f.posicion}`}</span>
                    {f.participante}
                  </span>
                  <span className="text-lg font-extrabold text-acento">{f.porcentaje}%</span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-borde">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-acento to-acento2"
                    style={{ width: `${f.porcentaje}%` }}
                  />
                </div>
                <p className="mt-2.5 text-xs text-tenue">
                  {f.puntaje}/{f.total} aciertos · {f.nivel}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
