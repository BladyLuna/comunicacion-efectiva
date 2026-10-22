import { QuizView } from "@/features/quiz/frontend/views/QuizView";

export const metadata = {
  title: "Quiz interactivo · Comunicación Efectiva",
  description:
    "Pon a prueba tus conocimientos sobre comunicación efectiva con preguntas recuperadas desde base de datos y retroalimentación explicada.",
};

export default function QuizPage() {
  return <QuizView />;
}
