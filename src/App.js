import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomePage, QuizPage, ResultPage } from './pages'
import QAns from './features/result/components/QAns'
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/start-quiz" element={<QuizPage/>} />
            <Route path="/quiz-result" element={<ResultPage/>} />
            {/* <Route path="/" element={<QAns/>} /> */}
        </Routes>
      </>
  )
}

export default App