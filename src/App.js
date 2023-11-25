import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { HomePage, QuizPage } from './pages'
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/start-quiz" element={<QuizPage/>} />
        </Routes>
      </>
  )
}

export default App