import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { TRAITS } from '../data/traits';
import { scoreUser, rankResults, weightedPick, TRAIT_CALIBRATION_GODS } from '../lib/quizEngine';
import { saveQuizResult } from '../lib/supabaseClient';

/**
 * Fluxo de quiz genérico (uma pergunta por vez), reutilizado pelos dois
 * quizzes. `resultSetter` grava o resultado sorteado no ResultsContext.
 */
export default function QuizFlow({ tipoQuiz, questions, entities, resultSetter }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const question = questions[step];

  function handleSelect(opcao) {
    const nextAnswers = [...answers, opcao];

    if (step + 1 < questions.length) {
      setAnswers(nextAnswers);
      setStep(step + 1);
      return;
    }

    const vector = scoreUser(nextAnswers, TRAITS);
    const ranked = rankResults(vector, entities, TRAITS, TRAIT_CALIBRATION_GODS);
    const picked = weightedPick(ranked, 3);

    resultSetter({ entity: picked, vector });
    saveQuizResult(tipoQuiz, picked.id, vector);
    navigate('/resultado');
  }

  return (
    <div className="flex flex-1 flex-col justify-center py-6">
      <ProgressBar current={step + 1} total={questions.length} />
      <AnimatePresence mode="wait">
        <QuestionCard
          key={question.id}
          questionNumber={step + 1}
          totalQuestions={questions.length}
          titulo={question.texto}
          opcoes={question.opcoes}
          onSelect={handleSelect}
        />
      </AnimatePresence>
    </div>
  );
}
