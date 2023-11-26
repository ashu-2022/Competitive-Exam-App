import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomePage, QuizPage, ResultPage } from './pages'
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/start-quiz" element={<QuizPage/>} />
            <Route path="/quiz-result" element={<ResultPage/>} />
        </Routes>
      </>
  )
}

export default App