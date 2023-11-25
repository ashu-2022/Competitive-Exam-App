import React, { useEffect } from 'react'
import Question from '../features/questions/Question'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
const QuizPage = () => {
  const userData = useSelector(selectUserInfo)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, [navigate, userData])
  
  return (
      <>
      {userData && <Question />}
    </>
  )
}

export default QuizPage