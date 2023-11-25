import React from 'react'
import { Routes, Route } from 'react-router-dom';
const App = () => {
    return (
      <>      
        <Routes>
            <Route path="/" element={<p className='text-3xl font-bold underline'>Hello</p>} />
        </Routes>
      </>
  )
}

export default App