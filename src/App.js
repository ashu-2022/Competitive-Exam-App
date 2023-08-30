import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Quiz } from './components';
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<Quiz/>} />
        </Routes>
      </>
  )
}

export default App