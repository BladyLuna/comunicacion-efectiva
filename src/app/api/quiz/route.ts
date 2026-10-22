import { handleGetPreguntas } from "@/features/quiz/backend/controllers/quiz.controller";

export async function GET(req: Request) {
  return handleGetPreguntas(req);
}
