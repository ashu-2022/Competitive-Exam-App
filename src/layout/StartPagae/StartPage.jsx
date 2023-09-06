import React, { useState, useEffect } from 'react'
import './StartPage.scss';
import { userIcon } from "../../assets"
import { useNavigate } from 'react-router-dom';



const StartPage = () => {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState("")
    const startQuizHandler = () => {
        console.log(userEmail)
        if(userEmail.length) navigate('/quiz-start', {state:userEmail})
    }
    
    const eraseCookie = (name) => {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    useEffect(() => {
        eraseCookie('quiz_start_timing');
    }, [])

  return (
      <div className='startPage__container'>
          <form className='start__form form-group'>
              <img src={userIcon} alt='user icon' className='profile__pic' />
              <input required type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} name='email' className='form-control form-control-lg w-75 my-3' placeholder='Enter your email ...' />
              <button onClick={startQuizHandler} className='btn btn-lg btn-primary'>Start Quiz</button>
          </form>
    </div>
  )
}

export default StartPage