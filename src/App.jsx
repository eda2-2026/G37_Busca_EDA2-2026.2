import { Routes, Route, Navigate } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import QuizGods from './pages/QuizGods';
import QuizOrgs from './pages/QuizOrgs';
import Result from './pages/Result';
import MapaMundi from './pages/MapaMundi';
import Profecias from './pages/Profecias';

function App() {
  return (
    <ResultsProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/quizes"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/quiz/deuses"
          element={
            <Layout>
              <QuizGods />
            </Layout>
          }
        />
        <Route
          path="/quiz/organizacoes"
          element={
            <Layout>
              <QuizOrgs />
            </Layout>
          }
        />
        <Route
          path="/resultado"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />
        <Route path="/mapa" element={<MapaMundi />} />
        <Route
          path="/profecias"
          element={
            <Layout>
              <Profecias />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ResultsProvider>
  );
}

export default App;
