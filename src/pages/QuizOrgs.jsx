import QuizFlow from '../components/QuizFlow';
import { ORGANIZATIONS } from '../data/orgs';
import { QUESTIONS_ORGS } from '../data/question-orgs';
import { useResults } from '../context/ResultsContext';

export default function QuizOrgs() {
  const { setOrgResult } = useResults();

  return (
    <QuizFlow
      tipoQuiz="organizacoes"
      questions={QUESTIONS_ORGS}
      entities={ORGANIZATIONS}
      resultSetter={setOrgResult}
    />
  );
}
