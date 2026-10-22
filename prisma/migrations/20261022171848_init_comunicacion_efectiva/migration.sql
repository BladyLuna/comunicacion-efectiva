-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('ESCUCHA_ACTIVA', 'COMUNICACION_NO_VERBAL', 'ASERTIVIDAD', 'FEEDBACK', 'COMUNICACION_DIGITAL', 'BARRERAS');

-- CreateEnum
CREATE TYPE "Dificultad" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "icono" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recursos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fuente" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preguntas" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "explicacion" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "dificultad" "Dificultad" NOT NULL DEFAULT 'BASICO',
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opciones" (
    "id" SERIAL NOT NULL,
    "preguntaId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "esCorrecta" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "opciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intentos" (
    "id" SERIAL NOT NULL,
    "participante" TEXT NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "porcentaje" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,
    "duracionSeg" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "intentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respuestas" (
    "id" SERIAL NOT NULL,
    "intentoId" INTEGER NOT NULL,
    "preguntaId" INTEGER NOT NULL,
    "opcionId" INTEGER NOT NULL,
    "correcta" BOOLEAN NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "respuestas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desarrolladores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "github" TEXT,
    "avatar" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "desarrolladores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecnologias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "icono" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tecnologias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articulos_slug_key" ON "articulos"("slug");

-- CreateIndex
CREATE INDEX "articulos_categoria_idx" ON "articulos"("categoria");

-- CreateIndex
CREATE INDEX "preguntas_activa_idx" ON "preguntas"("activa");

-- CreateIndex
CREATE INDEX "opciones_preguntaId_idx" ON "opciones"("preguntaId");

-- CreateIndex
CREATE INDEX "intentos_puntaje_idx" ON "intentos"("puntaje");

-- CreateIndex
CREATE INDEX "respuestas_intentoId_idx" ON "respuestas"("intentoId");

-- AddForeignKey
ALTER TABLE "opciones" ADD CONSTRAINT "opciones_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "preguntas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas" ADD CONSTRAINT "respuestas_intentoId_fkey" FOREIGN KEY ("intentoId") REFERENCES "intentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas" ADD CONSTRAINT "respuestas_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "preguntas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas" ADD CONSTRAINT "respuestas_opcionId_fkey" FOREIGN KEY ("opcionId") REFERENCES "opciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
