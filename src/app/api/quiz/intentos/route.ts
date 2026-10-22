import { handlePostIntento } from "@/features/quiz/backend/controllers/quiz.controller";

export async function POST(req: Request) {
  return handlePostIntento(req);
}
