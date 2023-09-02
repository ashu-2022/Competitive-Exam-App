import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const QuickReport = ({state}) => {
    const { questions, quizQuestStatus, user_id, user_submission, timeTaken } = state;
    const [quest_attempted, setQuesAttempted] = useState(0);
    const [quest_correct, setQuesCorrect] = useState(0);
    const [userTimeMin, setUserTimeMin] = useState(0)
    const [userTimeSec, setUserTimeSec] = useState(0)
    console.log(questions, quizQuestStatus, user_id, user_submission, timeTaken)

    useEffect(() => {
        if (timeTaken) {
            let min_sec = timeTaken.split(':');
            console.log("min_sec", min_sec)
            setUserTimeMin(30 - min_sec[0])
            setUserTimeSec(60 - min_sec[1])
        }

    }, [])


    const navigate = useNavigate()
    const tryAgainQuizHandler = () => {
        navigate('/')
    }
    return (
      <>
      <div className='quickReport__container'>
          <div className='quickReport__left'>
            <div className='insight question__attempted'>
                <p className='insight__title'>Question Attempted</p>
                        <p className='insight_value'>{quizQuestStatus.answered}/{questions.length}</p>
                <div className='progress__container'>  
                    <p style={{ width: `${100*quizQuestStatus.answered/questions.length}%`}} className='quest__attempted__progress'></p>
                </div>
            </div>
            <div className='insight quiz__marks'>
                <p className='insight__title'>Correct Questions</p>
                <p className='insight_value'>0/15</p>
                <div className='progress__container'>  
                    <p style={{ width: `${100*0/15}%`}} className='quiz__marks__progress'></p>
                </div>
            </div>
            <div className='insight quiz__time'>
                <p className='insight__title'>Time Taken (in min)</p>
                        <p className='insight_value'>{userTimeMin}:{userTimeSec}/30:00 </p>
                <div className='progress__container'>  
                    <p style={{ width: `${(100*(userTimeMin*60+userTimeSec))/(30*60)}%`}} className='quiz__time__progress'></p>
                </div>
            </div>
          </div>
          <div className='quickReport__right'>
              <div className='quiz__score'>
                  <h3>Your Score</h3>
                  <p><span className='score__obtained'>3</span> {''} / 15</p>
                  
              </div>
              
          </div>
            </div>
        <div className='re-quiz'>
              <button onClick={tryAgainQuizHandler}>Try Again Quiz</button>
          </div>
      </>
  )
}

export default QuickReport