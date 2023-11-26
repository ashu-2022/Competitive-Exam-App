import React, { useEffect } from 'react'
import Result from '../features/result/result'
import { useSelector } from 'react-redux'
import {selectResult} from '../features/result/resultSlice'
import { useNavigate } from 'react-router-dom'


const ResultPage = () => {
    const examsubmitted = useSelector(selectResult);
    const navigate = useNavigate()

    useEffect(() => {
        if (!examsubmitted.submit) {
            navigate('/');
        }
    }, [examsubmitted?.submit, navigate])
  return (
      <div className='mx-auto my-5 container'>
          <Result/>
    </div>
  )
}

export default ResultPage