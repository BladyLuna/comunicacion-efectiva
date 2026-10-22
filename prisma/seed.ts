/**
 * Seed — Comunicación Efectiva
 * Carga artículos, recursos, preguntas del quiz, equipo y tecnologías.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Categoria, Dificultad } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

const articulos = [
  {
    slug: "que-es-la-comunicacion-efectiva",
    titulo: "¿Qué es la comunicación efectiva?",
    resumen:
      "Es el proceso de transmitir un mensaje de modo que el receptor lo comprenda con el mismo sentido que le dio el emisor, generando una respuesta.",
    cuerpo:
      "La comunicación efectiva no termina cuando hablamos: termina cuando el otro entendió. Implica cuatro condiciones:\n\n1. **Claridad** — el mensaje usa un lenguaje que el receptor domina.\n2. **Concisión** — dice lo necesario, sin relleno que distraiga del núcleo.\n3. **Coherencia** — lo verbal y lo no verbal apuntan en la misma dirección.\n4. **Retroalimentación** — existe un canal de retorno que confirma la comprensión.\n\nCuando falta cualquiera de las cuatro, aparece el ruido: el mensaje llega distorsionado, incompleto o cargado de un sentido que nunca tuvo.",
    icono: "💬",
    categoria: Categoria.BARRERAS,
    orden: 1,
    destacado: true,
  },
  {
    slug: "escucha-activa",
    titulo: "Escucha activa: oír no es escuchar",
    resumen:
      "Escuchar activamente es prestar atención plena al mensaje y demostrarlo, suspendiendo la respuesta que ya estábamos preparando.",
    cuerpo:
      "Oír es un acto fisiológico; escuchar es una decisión. La escucha activa se entrena con prácticas concretas:\n\n- **Parafrasear**: «Si entendí bien, lo que te preocupa es…». Devuelve el mensaje para verificar.\n- **No interrumpir**: dejar que la idea se complete, aunque creamos anticipar el final.\n- **Preguntar antes de opinar**: una pregunta abierta revela más que un consejo apresurado.\n- **Silencios útiles**: dos segundos de pausa invitan al otro a profundizar.\n- **Atención corporal**: contacto visual, cuerpo orientado, dispositivos guardados.\n\nEl error más común es la *escucha para responder*: mientras el otro habla, ensayamos nuestro argumento. Ahí dejamos de recibir información.",
    icono: "👂",
    categoria: Categoria.ESCUCHA_ACTIVA,
    orden: 2,
    destacado: true,
  },
  {
    slug: "comunicacion-no-verbal",
    titulo: "Comunicación no verbal: el mensaje silencioso",
    resumen:
      "Postura, gestos, mirada y tono acompañan cada palabra. Cuando contradicen al discurso, el receptor suele creerle al cuerpo.",
    cuerpo:
      "Los canales no verbales operan todo el tiempo, incluso en silencio:\n\n- **Kinésica** — gestos, postura, expresión facial.\n- **Proxémica** — la distancia física que elegimos sostener.\n- **Paralenguaje** — tono, volumen, velocidad y pausas de la voz.\n- **Apariencia y contexto** — vestimenta, puntualidad, orden del espacio.\n\nUna frase de apoyo dicha con brazos cruzados y mirada esquiva pierde credibilidad. La regla práctica: **alinear el cuerpo con el mensaje**. Y recordar que los gestos tienen lectura cultural: lo que es cordial en un contexto puede resultar invasivo en otro.",
    icono: "🙌",
    categoria: Categoria.COMUNICACION_NO_VERBAL,
    orden: 3,
    destacado: true,
  },
  {
    slug: "asertividad",
    titulo: "Asertividad: ni agresivo ni pasivo",
    resumen:
      "Expresar lo que se piensa y necesita, defendiendo los propios derechos sin pasar por encima de los del otro.",
    cuerpo:
      "Existen tres estilos de respuesta frente a un conflicto:\n\n- **Pasivo** — callo lo que me molesta; evito el roce, pero acumulo resentimiento.\n- **Agresivo** — lo digo imponiéndome; gano la discusión y pierdo la relación.\n- **Asertivo** — lo digo con claridad y respeto; cuido el vínculo y el contenido.\n\nUna fórmula que funciona:\n\n> «Cuando *(hecho observable)*, yo me siento *(emoción)*, porque *(necesidad)*. Te pido *(petición concreta)*.»\n\nEjemplo: «Cuando el informe llega una hora antes de la entrega, me siento presionado porque no alcanzo a revisarlo. Te pido que me lo envíes el día anterior.» Describe un hecho, no una etiqueta sobre la persona.",
    icono: "⚖️",
    categoria: Categoria.ASERTIVIDAD,
    orden: 4,
    destacado: true,
  },
  {
    slug: "retroalimentacion-constructiva",
    titulo: "Retroalimentación constructiva",
    resumen:
      "Un buen feedback describe conductas observables, se entrega a tiempo y propone un camino de mejora.",
    cuerpo:
      "Reglas del feedback que sí construye:\n\n1. **Oportuno** — cerca del hecho, no tres meses después.\n2. **Específico** — «las últimas tres entregas llegaron fuera de plazo», no «eres desorganizado».\n3. **Sobre la conducta, no sobre la persona** — se critica lo que se hizo, no quién es.\n4. **Bidireccional** — se cierra preguntando: «¿cómo lo ves tú?».\n5. **Privado si corrige, público si reconoce.**\n\nEl elogio también es retroalimentación: señalar con precisión qué estuvo bien hace que la conducta se repita.",
    icono: "🔄",
    categoria: Categoria.FEEDBACK,
    orden: 5,
    destacado: false,
  },
  {
    slug: "comunicacion-digital",
    titulo: "Comunicación digital y entornos virtuales",
    resumen:
      "En el texto se pierden el tono y el gesto. Por eso el mensaje escrito necesita más contexto, no menos.",
    cuerpo:
      "Claves para no generar ruido en chats, correos y videollamadas:\n\n- **Asunto que anticipa**: un correo con asunto claro se responde antes.\n- **Una idea por mensaje**: evita los muros de texto con cinco temas mezclados.\n- **Cuidado con la ironía**: sin tono de voz, suele leerse como agresión.\n- **MAYÚSCULAS = gritar.** Los signos de exclamación en cadena restan seriedad.\n- **Videollamada**: cámara encendida cuando se discute algo sensible; micrófono apagado al no hablar.\n- **Elegir el canal**: lo urgente por llamada, lo complejo por documento, lo formal por correo.\n\nRegla de oro: si un tema lleva más de tres mensajes de ida y vuelta sin acuerdo, dejar el chat y hablar.",
    icono: "💻",
    categoria: Categoria.COMUNICACION_DIGITAL,
    orden: 6,
    destacado: false,
  },
  {
    slug: "barreras-de-la-comunicacion",
    titulo: "Barreras que bloquean el mensaje",
    resumen:
      "Obstáculos físicos, semánticos, psicológicos y culturales que deforman el mensaje entre el emisor y el receptor.",
    cuerpo:
      "Tipos de barrera y cómo sortearlas:\n\n- **Físicas** — ruido ambiente, mala señal, distancia. *Solución:* cambiar de canal o de entorno.\n- **Semánticas** — tecnicismos, ambigüedad, jerga. *Solución:* definir términos y pedir que repitan con sus palabras.\n- **Psicológicas** — prejuicios, estrés, emociones intensas, estar a la defensiva. *Solución:* postergar la conversación difícil hasta recuperar la calma.\n- **Fisiológicas** — cansancio, hambre, dolor. *Solución:* reconocer el estado y reagendar.\n- **Culturales** — idiomas, costumbres, normas distintas. *Solución:* preguntar en vez de suponer.\n\nIdentificar la barrera es la mitad de la solución: cada una se corrige de forma distinta.",
    icono: "🚧",
    categoria: Categoria.BARRERAS,
    orden: 7,
    destacado: false,
  },
  {
    slug: "comunicacion-en-equipo",
    titulo: "Comunicación en equipos de trabajo",
    resumen:
      "Los equipos fallan menos por falta de talento que por falta de información compartida a tiempo.",
    cuerpo:
      "Prácticas que sostienen la comunicación de un equipo:\n\n- **Acuerdos explícitos**: quién decide qué, en qué canal se avisa, cuál es el plazo.\n- **Reuniones con propósito**: objetivo escrito, duración fija, acuerdos registrados.\n- **Actualizaciones breves y periódicas** en lugar de un informe gigante al final.\n- **Seguridad psicológica**: que se pueda decir «no entendí» o «me equivoqué» sin castigo.\n- **Cerrar el bucle**: confirmar la recepción de lo que nos delegaron.\n\nUn equipo que comunica mal duplica trabajo, repite errores y descubre los problemas tarde.",
    icono: "🤝",
    categoria: Categoria.FEEDBACK,
    orden: 8,
    destacado: false,
  },
];

const recursos = [
  {
    titulo: "Los 7 hábitos de la gente altamente efectiva — Hábito 5",
    descripcion:
      "«Procura primero comprender, y después ser comprendido»: el principio clásico de la escucha empática.",
    url: "https://www.franklincovey.com/the-7-habits/",
    tipo: "GUIA",
    fuente: "FranklinCovey",
  },
  {
    titulo: "Comunicación No Violenta (Marshall Rosenberg)",
    descripcion:
      "Modelo de cuatro pasos —observación, sentimiento, necesidad y petición— para conversaciones difíciles.",
    url: "https://www.cnvc.org/learn-nvc/what-is-nvc",
    tipo: "ARTICULO",
    fuente: "Center for Nonviolent Communication",
  },
  {
    titulo: "10 maneras de tener una mejor conversación — Celeste Headlee",
    descripcion:
      "Charla TED con reglas prácticas de conversación: no multitareas, no sermonees, usa preguntas abiertas.",
    url: "https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation",
    tipo: "VIDEO",
    fuente: "TED",
  },
  {
    titulo: "Tu lenguaje corporal puede moldear quién eres — Amy Cuddy",
    descripcion: "Cómo la postura influye en la percepción ajena y en la confianza propia.",
    url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
    tipo: "VIDEO",
    fuente: "TED",
  },
  {
    titulo: "Habilidades para la vida — OMS/OPS",
    descripcion:
      "Marco de habilidades psicosociales donde la comunicación efectiva es una competencia central.",
    url: "https://www.paho.org/es",
    tipo: "GUIA",
    fuente: "Organización Panamericana de la Salud",
  },
  {
    titulo: "Escucha activa: técnica y aplicación",
    descripcion: "Guía práctica de técnicas de parafraseo, reflejo emocional y preguntas abiertas.",
    url: "https://www.mindtools.com/az4wxv7/active-listening",
    tipo: "ARTICULO",
    fuente: "MindTools",
  },
];

type PreguntaSeed = {
  enunciado: string;
  explicacion: string;
  categoria: Categoria;
  dificultad: Dificultad;
  opciones: { texto: string; esCorrecta: boolean }[];
};

const preguntas: PreguntaSeed[] = [
  {
    enunciado: "¿Cuál es la diferencia fundamental entre oír y escuchar?",
    explicacion:
      "Oír es un proceso fisiológico automático; escuchar requiere atención voluntaria, interpretación del mensaje y demostrar esa comprensión al emisor.",
    categoria: Categoria.ESCUCHA_ACTIVA,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "No hay diferencia, son sinónimos exactos", esCorrecta: false },
      { texto: "Oír es fisiológico y automático; escuchar implica atención e interpretación", esCorrecta: true },
      { texto: "Escuchar solo ocurre en conversaciones formales", esCorrecta: false },
      { texto: "Oír requiere más esfuerzo mental que escuchar", esCorrecta: false },
    ],
  },
  {
    enunciado: "Durante una conversación, tu interlocutor dice algo con lo que no estás de acuerdo. ¿Cuál es la respuesta más asertiva?",
    explicacion:
      "La asertividad expresa el desacuerdo con claridad y respeto, sin callarlo (pasivo) ni descalificar a la persona (agresivo).",
    categoria: Categoria.ASERTIVIDAD,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "Callar para evitar el conflicto y seguir incómodo", esCorrecta: false },
      { texto: "Interrumpir de inmediato y señalar que está equivocado", esCorrecta: false },
      { texto: "Escuchar hasta el final y luego expresar tu punto de vista con respeto", esCorrecta: true },
      { texto: "Cambiar de tema para que no se note la diferencia", esCorrecta: false },
    ],
  },
  {
    enunciado: "¿Qué ocurre cuando el mensaje verbal contradice al lenguaje no verbal?",
    explicacion:
      "Ante la incongruencia, el receptor tiende a otorgar más credibilidad a las señales no verbales, porque se controlan menos conscientemente.",
    categoria: Categoria.COMUNICACION_NO_VERBAL,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "El receptor suele dar más credibilidad al lenguaje no verbal", esCorrecta: true },
      { texto: "El receptor siempre cree en las palabras literales", esCorrecta: false },
      { texto: "La contradicción pasa desapercibida", esCorrecta: false },
      { texto: "El mensaje se vuelve automáticamente más persuasivo", esCorrecta: false },
    ],
  },
  {
    enunciado: "El parafraseo («Si entendí bien, lo que me dices es…») sirve principalmente para:",
    explicacion:
      "El parafraseo verifica la comprensión y le demuestra al emisor que fue escuchado, reduciendo malentendidos antes de que escalen.",
    categoria: Categoria.ESCUCHA_ACTIVA,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "Rellenar silencios incómodos", esCorrecta: false },
      { texto: "Verificar la comprensión y demostrar escucha", esCorrecta: true },
      { texto: "Ganar tiempo para preparar un contraargumento", esCorrecta: false },
      { texto: "Demostrar que uno tiene mejor memoria", esCorrecta: false },
    ],
  },
  {
    enunciado: "¿Cuál de estas es una barrera SEMÁNTICA de la comunicación?",
    explicacion:
      "Las barreras semánticas afectan el significado: tecnicismos, jerga o ambigüedad. El ruido es física; el prejuicio, psicológica; el cansancio, fisiológica.",
    categoria: Categoria.BARRERAS,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "El ruido de una obra en la calle", esCorrecta: false },
      { texto: "Usar tecnicismos que el receptor no conoce", esCorrecta: true },
      { texto: "Tener un prejuicio sobre quien habla", esCorrecta: false },
      { texto: "Estar cansado después de una jornada larga", esCorrecta: false },
    ],
  },
  {
    enunciado: "Un compañero entregó tarde tres informes. ¿Cuál es la retroalimentación mejor formulada?",
    explicacion:
      "El buen feedback describe conductas observables y concretas, no etiquetas sobre la persona, y abre espacio para la respuesta del otro.",
    categoria: Categoria.FEEDBACK,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "«Eres un irresponsable, nunca cumples»", esCorrecta: false },
      { texto: "«Los últimos tres informes llegaron después del plazo; ¿qué está pasando?»", esCorrecta: true },
      { texto: "No decir nada y reasignarle menos trabajo", esCorrecta: false },
      { texto: "Comentarlo con el resto del equipo delante de él", esCorrecta: false },
    ],
  },
  {
    enunciado: "En comunicación digital escrita, escribir TODO EN MAYÚSCULAS se interpreta habitualmente como:",
    explicacion:
      "Por convención en entornos digitales, las mayúsculas sostenidas equivalen a gritar y transmiten agresividad, además de dificultar la lectura.",
    categoria: Categoria.COMUNICACION_DIGITAL,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "Un signo de formalidad y respeto", esCorrecta: false },
      { texto: "Gritar o mostrar agresividad", esCorrecta: true },
      { texto: "Una forma de mejorar la legibilidad", esCorrecta: false },
      { texto: "Una señal de urgencia aceptada profesionalmente", esCorrecta: false },
    ],
  },
  {
    enunciado: "La fórmula asertiva «Cuando ocurre X, me siento Y, porque necesito Z; te pido W» se caracteriza por:",
    explicacion:
      "Parte de un hecho observable y de la propia emoción, en vez de acusar al otro. Eso reduce la reacción defensiva y hace viable el acuerdo.",
    categoria: Categoria.ASERTIVIDAD,
    dificultad: Dificultad.AVANZADO,
    opciones: [
      { texto: "Centrarse en los defectos de carácter del otro", esCorrecta: false },
      { texto: "Describir un hecho concreto y la propia emoción, sin acusar", esCorrecta: true },
      { texto: "Evitar pedir nada para no incomodar", esCorrecta: false },
      { texto: "Generalizar con «siempre» y «nunca» para dar fuerza", esCorrecta: false },
    ],
  },
  {
    enunciado: "La proxémica, dentro de la comunicación no verbal, estudia:",
    explicacion:
      "La proxémica analiza el uso del espacio y la distancia entre interlocutores; la kinésica estudia gestos y postura, y el paralenguaje, el tono de voz.",
    categoria: Categoria.COMUNICACION_NO_VERBAL,
    dificultad: Dificultad.AVANZADO,
    opciones: [
      { texto: "El uso del espacio y la distancia entre las personas", esCorrecta: true },
      { texto: "Los gestos de las manos exclusivamente", esCorrecta: false },
      { texto: "El tono y volumen de la voz", esCorrecta: false },
      { texto: "La elección del vocabulario técnico", esCorrecta: false },
    ],
  },
  {
    enunciado: "¿Cuál es el error más frecuente que impide la escucha activa?",
    explicacion:
      "La «escucha para responder» ocupa la atención en preparar el propio argumento, de modo que gran parte del mensaje del otro nunca se procesa.",
    categoria: Categoria.ESCUCHA_ACTIVA,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "Mantener contacto visual con el emisor", esCorrecta: false },
      { texto: "Ir preparando la respuesta mientras el otro habla", esCorrecta: true },
      { texto: "Hacer preguntas abiertas al final", esCorrecta: false },
      { texto: "Tomar notas de los puntos clave", esCorrecta: false },
    ],
  },
  {
    enunciado: "En un equipo de trabajo, ¿qué práctica mejora más la comunicación interna?",
    explicacion:
      "Los acuerdos explícitos sobre canales, responsables y plazos eliminan la mayor fuente de ruido: suponer que el otro ya sabía.",
    categoria: Categoria.FEEDBACK,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "Acordar explícitamente canales, responsables y plazos", esCorrecta: true },
      { texto: "Realizar un único informe extenso al cierre del proyecto", esCorrecta: false },
      { texto: "Evitar las reuniones para no perder tiempo", esCorrecta: false },
      { texto: "Comunicar solo cuando aparece un problema grave", esCorrecta: false },
    ],
  },
  {
    enunciado: "Si un tema lleva varios mensajes de chat sin llegar a acuerdo, lo más efectivo es:",
    explicacion:
      "El texto carece de tono y gesto, así que los malentendidos se acumulan. Cambiar a un canal con voz e imagen recupera esa información perdida.",
    categoria: Categoria.COMUNICACION_DIGITAL,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "Enviar un mensaje aún más largo y detallado", esCorrecta: false },
      { texto: "Cambiar a una llamada o videollamada", esCorrecta: true },
      { texto: "Dejar de responder hasta que el otro ceda", esCorrecta: false },
      { texto: "Sumar más personas al grupo para que opinen", esCorrecta: false },
    ],
  },
  {
    enunciado: "La retroalimentación que corrige una conducta conviene darla:",
    explicacion:
      "Corregir en privado protege la dignidad de la persona y favorece que escuche; el reconocimiento, en cambio, gana valor cuando es público.",
    categoria: Categoria.FEEDBACK,
    dificultad: Dificultad.BASICO,
    opciones: [
      { texto: "En privado y cerca del momento del hecho", esCorrecta: true },
      { texto: "Delante de todo el equipo, para que sirva de ejemplo", esCorrecta: false },
      { texto: "Varios meses después, en la evaluación anual", esCorrecta: false },
      { texto: "Por mensaje grupal, para dejar constancia", esCorrecta: false },
    ],
  },
  {
    enunciado: "El estilo comunicativo PASIVO se caracteriza por:",
    explicacion:
      "El estilo pasivo evita el conflicto callando las propias necesidades, lo que genera acumulación de malestar y relaciones desequilibradas.",
    categoria: Categoria.ASERTIVIDAD,
    dificultad: Dificultad.INTERMEDIO,
    opciones: [
      { texto: "Imponer la propia opinión sobre la del resto", esCorrecta: false },
      { texto: "No expresar necesidades propias para evitar el conflicto", esCorrecta: true },
      { texto: "Negociar buscando un punto de acuerdo", esCorrecta: false },
      { texto: "Expresar desacuerdo con respeto y firmeza", esCorrecta: false },
    ],
  },
  {
    enunciado: "¿Cuál de los siguientes elementos NO forma parte del proceso comunicativo?",
    explicacion:
      "Emisor, receptor, mensaje, canal, código, contexto y retroalimentación son los componentes del proceso. El «prejuicio» es una barrera, no un elemento.",
    categoria: Categoria.BARRERAS,
    dificultad: Dificultad.AVANZADO,
    opciones: [
      { texto: "El canal por el que viaja el mensaje", esCorrecta: false },
      { texto: "La retroalimentación del receptor", esCorrecta: false },
      { texto: "El prejuicio del receptor hacia el emisor", esCorrecta: true },
      { texto: "El código compartido entre ambos", esCorrecta: false },
    ],
  },
];

const desarrolladores = [
  {
    nombre: "Bladimir Luna Corrales",
    rol: "Desarrollador Full Stack · Analista y Diseñador",
    bio: "Estudiante de Sistemas Informáticos del INCOS «Federico Álvarez Plata» Nocturno. Responsable del análisis, el diseño de la base de datos, el desarrollo frontend y backend, y el despliegue de la aplicación.",
    github: "https://github.com/BladyLuna",
    avatar: "👨‍💻",
  },
];

const tecnologias = [
  { nombre: "Next.js 16", categoria: "Frontend", descripcion: "Framework de React con App Router, Server Components y renderizado híbrido.", icono: "▲", orden: 1 },
  { nombre: "React 19", categoria: "Frontend", descripcion: "Biblioteca de interfaces basada en componentes reutilizables.", icono: "⚛️", orden: 2 },
  { nombre: "TypeScript", categoria: "Frontend", descripcion: "Tipado estático sobre JavaScript para evitar errores en tiempo de ejecución.", icono: "🔷", orden: 3 },
  { nombre: "Tailwind CSS 4", categoria: "Frontend", descripcion: "Framework de estilos utilitario con diseño responsive mobile-first.", icono: "🎨", orden: 4 },
  { nombre: "Route Handlers", categoria: "Backend", descripcion: "API REST interna de Next.js que expone los endpoints del quiz.", icono: "🔌", orden: 5 },
  { nombre: "Zod", categoria: "Backend", descripcion: "Validación de esquemas de datos en la frontera de la API.", icono: "🛡️", orden: 6 },
  { nombre: "Prisma ORM 7", categoria: "Base de datos", descripcion: "ORM con migraciones versionadas y cliente tipado hacia PostgreSQL.", icono: "🔺", orden: 7 },
  { nombre: "PostgreSQL", categoria: "Base de datos", descripcion: "Motor relacional donde residen preguntas, intentos y respuestas.", icono: "🐘", orden: 8 },
  { nombre: "Vercel", categoria: "Despliegue", descripcion: "Plataforma de despliegue continuo con HTTPS y CDN global.", icono: "🚀", orden: 9 },
  { nombre: "Git & GitHub", categoria: "Despliegue", descripcion: "Control de versiones y repositorio remoto del proyecto.", icono: "🐙", orden: 10 },
];

async function main() {
  console.log("🌱 Limpiando datos previos…");
  await prisma.respuesta.deleteMany();
  await prisma.intento.deleteMany();
  await prisma.opcion.deleteMany();
  await prisma.pregunta.deleteMany();
  await prisma.articulo.deleteMany();
  await prisma.recurso.deleteMany();
  await prisma.desarrollador.deleteMany();
  await prisma.tecnologia.deleteMany();

  console.log("📚 Cargando artículos…");
  await prisma.articulo.createMany({ data: articulos });

  console.log("🔗 Cargando recursos…");
  await prisma.recurso.createMany({ data: recursos });

  console.log("❓ Cargando preguntas y opciones…");
  for (const p of preguntas) {
    await prisma.pregunta.create({
      data: {
        enunciado: p.enunciado,
        explicacion: p.explicacion,
        categoria: p.categoria,
        dificultad: p.dificultad,
        opciones: {
          create: p.opciones.map((o, i) => ({ texto: o.texto, esCorrecta: o.esCorrecta, orden: i })),
        },
      },
    });
  }

  console.log("👥 Cargando equipo y tecnologías…");
  await prisma.desarrollador.createMany({ data: desarrolladores });
  await prisma.tecnologia.createMany({ data: tecnologias });

  const [a, r, q, o] = await Promise.all([
    prisma.articulo.count(),
    prisma.recurso.count(),
    prisma.pregunta.count(),
    prisma.opcion.count(),
  ]);
  console.log(`✅ Seed completo → ${a} artículos · ${r} recursos · ${q} preguntas · ${o} opciones`);
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
