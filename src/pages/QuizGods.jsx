import QuizFlow from '../components/QuizFlow';
import { GODS } from '../data/gods';
import { QUESTIONS_GODS } from '../data/question-gods';
import { useResults } from '../context/ResultsContext';

export default function QuizGods() {
  const { setGodResult } = useResults();

  return (
    <QuizFlow
      tipoQuiz="deuses"
      questions={QUESTIONS_GODS}
      entities={GODS}
      resultSetter={setGodResult}
    />
  );
}
