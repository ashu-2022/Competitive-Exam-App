import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home, Result, StartPage } from './layout';
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/quiz-start" element={<Home/>} />
            <Route path="/quiz-result" element={<Result/>} />
        </Routes>
      </>
  )
}

export default App