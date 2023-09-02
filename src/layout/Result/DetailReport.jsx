import React, { useState } from 'react'

const DetailReport = ({ state }) => {
    const { questions, quizQuestStatus, user_id, user_submission } = state;
    console.log(questions, quizQuestStatus, user_id, user_submission)
  return (
      <div className='detailReport__container'>
          {questions.map((item, index) => {
              return <QuestionSolution {...item} key={index} Qno={index} user_submission={user_submission} />
          })}
    </div>
  )
}

export default DetailReport


const QuestionSolution = ({ question, incorrect_answers, correct_answer, Qno, user_submission }) => {
    console.log(question, incorrect_answers, correct_answer, Qno, user_submission)
    const [showAnswer, setShowAnswer] = useState(false)
    const getUserAnswered = () => {
        console.log("inside getUserAnswered()", user_submission,Qno,user_submission[Qno])
        let user_answered = "";
        try {
            const answer_selected = user_submission[Qno]['answer_selected'];
            if (answer_selected) user_answered = answer_selected;
        } catch {
            
        }
        console.log("user_answered", user_answered)
        return user_answered
    }
    return (
        <div className='question__item'>
            <p className='question__no'>Q.{Qno + 1}</p>
            <p>{question}</p>
            <ul>
                {
                    [...incorrect_answers, correct_answer].map(item => (
                        <li className={`${((item===correct_answer)&&showAnswer)?'right__answer':''}`}>{item}</li>
                    ))
               } 
            </ul>
            <div className='question__answer'>
                <button onClick={() => setShowAnswer(prev=> !prev)} >{`${showAnswer?'Hide Answer':'Show Answer'}`}</button>
                <div className={`${showAnswer? 'd-block show__answered':'d-none'}`}>
                    <p>Your Answer: <span className='user__answered'>{ getUserAnswered()}</span></p>
                    <p>Correct Answer: <span className='correct__answered'>{correct_answer}</span></p>
                </div>
            </div>
        </div>
    )
} 