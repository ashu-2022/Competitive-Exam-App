import React from 'react'
import { userIcon } from '../../assets'
import './ProfileMenu.scss';


const ProfileMenu = ({ questions, nextQuestionHandler, userData ,quizQuestStatus, setSubmitQuiz, user_id}) => {

    const {answered, not_answered, answered_willReview, willReview, not_visited} =quizQuestStatus
    const checkQuestStatus = (quest_index) => {
        let quest_status = 'not__answered';
        try {
            let wasAnswered = userData[quest_index]['status'];
            if (wasAnswered==='answered_willReview') quest_status = 'answered__marked';
            else if (wasAnswered==='answered') quest_status= 'answered'
            else if (wasAnswered==='willReview') quest_status= 'marked'
            
        } catch {
            quest_status = 'not__visited';
        }
        return quest_status;
    }
    // console.log("userData", userData)


  return (
      <div className='profileMenu__container'>
          <div className='profile'>
              <img className='profile__pic' src={userIcon} alt='Profile Pic' />
              <p>{user_id}</p>
          </div>
          <div className='questions__menu'>
              <div className='info__menu'>
                  <div className='answered'>
                      <p>{answered}</p> Answered
                  </div>
                  <div className='not__answered'>
                      <p>{not_answered}</p>
                      Not Answered
                  </div>
                  <div className='not__visited'>
                      <p>{ not_visited}</p>
                      Not Visited
                  </div>
                  <div className='marked'>
                      <p>{willReview} </p>
                      Marked
                  </div>
                  <div className='answered__marked'>
                      <p>{answered_willReview}</p>
                      <div>                          
                        Answered & Marked for Review
                        <p>(will be consider for evaluation)</p>
                      </div>
                  </div>
                  
              </div>
              <div className='quiz__title'>Frontend Enginner</div>
              <p className='ps-2'>Choose a Question</p>
              <div className='question__list'>
                  {
                      questions.length ? (
                        questions.map((data, index) => (
                            <div className={`quest__item ${checkQuestStatus(index)}`} >
                                <p className='m-0' onClick={()=>nextQuestionHandler( 'not_answered', index)} key={index}>{index+1}</p>
                            </div>)
                        )
                      ) : null
                  }

                  
                  
              </div>
              
          </div>
          <div className='submit__btn'>
              <button onClick={setSubmitQuiz}>Submit</button>
          </div>
    </div>
  )
}

export default ProfileMenu