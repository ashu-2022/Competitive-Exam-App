import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const QuickReport = ({state}) => {
    const { questions, quizQuestStatus, user_id, user_submission, time_left } = state;
    const [quest_attempted, setQuesAttempted] = useState(0);
    const [quest_correct, setQuesCorrect] = useState(0);
    const [userTimeMin, setUserTimeMin] = useState(0)
    const [userTimeSec, setUserTimeSec] = useState(0)
    // console.log(questions, quizQuestStatus, user_id, user_submission, time_left)

    useEffect(() => {
        if (time_left) {
            let min_sec = time_left.split(':');
            setUserTimeMin(29 - min_sec[0])
            setUserTimeSec(60 - min_sec[1])
        }

        let local_question_attempted = 0
        let local_correct_question = 0;
        for (const [key, value] of Object.entries(user_submission)) {
            const { status, answer_selected } = value
            if (status === 'answered_willReview' || status === 'answered') {
                local_question_attempted++;
                if (answer_selected === questions[key]['correct_answer']) {
                    local_correct_question++;
                }    
            }
            
        } 
        setQuesAttempted(local_question_attempted);
        setQuesCorrect(local_correct_question);
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
                        <p className='insight_value'>{quest_correct}/{questions.length}</p>
                <div className='progress__container'>  
                    <p style={{ width: `${100*quest_correct/questions.length}%`}} className='quiz__marks__progress'></p>
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
                        <p><span className='score__obtained'>{quest_correct}</span> {''} / 15</p>
                  
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