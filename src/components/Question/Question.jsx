import React, { useState, useEffect } from "react";
import "./Question.scss";
import axios from "axios";
import { ProfileMenu } from "../index";
import { useNavigate } from "react-router-dom";
const API_URL = "https://opentdb.com/api.php?amount=15&type=multiple";
const Question = ({user_id}) => {
  const navigator = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userData, setUserData] = useState({});
  const [answer, setAnswer] = useState("");
  const [quizQuestStatus, setQuizQuestStatus] = useState({})
  const [submitQuiz, setSubmitQuiz] = useState(false)
  const [quizTime, setQuizTime] = useState("30:00");
  const [quizStartTime, setQuizStartTime] = useState(null)
  const getCookie = (name) =>{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  const setCookie = (name,value,minutes)=>{
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

  useEffect(() => {
    fetchQuestions();
    let quiz_start_time = getCookie('quiz_start_timing');
    let current_time = new Date();
    if (!quiz_start_time) {
      setCookie('quiz_start_timing', current_time, 30);
      setQuizStartTime(current_time);
    } else {
      setQuizStartTime(quiz_start_time);
    }
  }, [])

  useEffect(() => {
    let id =  setInterval(() => {
      updateQuizTime()
    }, 1000)
    return () => clearInterval(id)
  }, [quizStartTime])

  useEffect(() => {
    setAnswer("")
    if (!(currentQuestion in userData)) {
      setUserData(prev => ({
        ...prev, [currentQuestion]: {
          'status': 'not_answered'
        }
      }));
    }
    try {
      let was_answered = userData[currentQuestion]['answer_selected'];
      if (was_answered !== undefined) setAnswer(was_answered);
    }catch{
      
      }
  }, [currentQuestion])


  const handleSumitModal = (event) => {
    event.stopPropagation();
  }

  const navigateToQuizResult = () => {
    updateQuizTime()
    let user_quiz_data = {
      'questions': questions,
      'user_submission': userData,
      'quizQuestStatus': quizQuestStatus,
      'user_id': user_id,
      'time_left': quizTime

    };
    navigator('/quiz-result', {state:user_quiz_data})
  }

  const fetchQuestions = async () => {
    let response = await axios.get(API_URL);
    let response_data = response.data.results;
    setQuestions(response_data);
    setQuizQuestStatus(prev => ({
      ...prev,
      'answered': 0,
      'not_answered': 1,
      'answered_willReview': 0,
      'willReview': 0,
      'not_visited': response_data.length - 1,
    }))
  };

  const updateQuizTime = () => {
    let time_prev = new Date(quizStartTime);
    let time_now = new Date();
    let time_diff = Math.abs(time_now - time_prev)
    // console.log(time_prev, time_now, time_diff);
    let msec = time_diff;
    let time_diff_hours = Math.floor(msec/1000/60/60)
    msec -= time_diff_hours * 1000 * 60 * 60;
    let time_diff_mins = Math.floor(msec/1000/60)
    msec -= time_diff_mins * 1000 * 60;
    let time_diff_min_sec = Math.floor(msec/1000)
    msec -= time_diff_min_sec * 1000;
    setQuizTime(`${29-time_diff_mins}:${59-time_diff_min_sec}`)
  }


  const nextQuestionHandler = (action, quest_ind = null) => {
    // action -> 'not_answered', 'save_next', 'mark_next'
    if (quest_ind !== null) setCurrentQuestion(quest_ind);
    else {
      setCurrentQuestion(prev => 
        prev===questions.length-1?0:prev+1
      )
    }
    if (action === 'save_next') {
      if (answer.length) {
        setUserData(prev => ({
          ...prev, [currentQuestion]: {  
            'answer_selected': answer,
            'status': 'answered'
          }
        }));
        setAnswer("");
        setQuizQuestStatus(prev => ({
          ...prev,
          'answered': prev.answered + 1,
          'not_visited': prev.not_visited ? prev.not_visited - 1 : prev.not_visited,
        }))


      } else {
        setUserData(prev => ({
          ...prev, [currentQuestion]: {  
            'status': 'not_answered'
          }
        }));
        setQuizQuestStatus(prev => ({
          ...prev,
          'not_answered': prev.not_answered + 1,
          'not_visited': prev.not_visited ? prev.not_visited - 1 : prev.not_visited,
        }))
      }

    } else if (action === "mark_next") {
      if (answer.length) {
        setUserData(prev => ({
          ...prev, [currentQuestion]: {  
            'answer_selected': answer,
            'status': 'answered_willReview'
          }
        }));
        setAnswer("");
        setQuizQuestStatus(prev => ({
          ...prev,
          'answered_willReview': prev.answered_willReview + 1,
          'not_visited': prev.not_visited ? prev.not_visited - 1 : prev.not_visited,
        }))
      } else {
        setUserData(prev => ({
          ...prev, [currentQuestion]: {  
            'status': 'willReview'
          }
        }));

        setQuizQuestStatus(prev => ({
          ...prev,
          'willReview': prev.willReview + 1,
          'not_visited': prev.not_visited ? prev.not_visited - 1 : prev.not_visited,
        }))
      }

    } 
    const { answered, not_answered, answered_willReview, willReview, not_visited } = quizQuestStatus;
    if ((answered + not_answered + answered_willReview + willReview) === questions.length) {
      setQuizQuestStatus(prev => ({
        ...prev, 
        'not_visited' : 0
      }))
    }
    
  }

  

  return (
    <>
      <ProfileMenu
        questions={questions}
        nextQuestionHandler={nextQuestionHandler}
        userData={userData}
        quizQuestStatus={quizQuestStatus}
        setSubmitQuiz={setSubmitQuiz}
        user_id={user_id}
      />
      <div className="question__container">
        <div className="question__info">
          <p style={{ color: "#e5631d" }}>Question Type: MCQ</p>
          <p>
            Marks for correct answer <span style={{ color: "green" }}>1</span> |{" "}
            Negative Marks <span style={{ color: "red" }}>0</span>
          </p>
        </div>
        {questions.length ? (
          <>
            <div className="quiz__timer">
              <p className="quiz__time">Time Left &nbsp;  {" "} <span className="time__left">{quizTime} </span>  &nbsp; minutes</p>
            </div>
          <div className="question">
            <p className="question__no">Question No. {currentQuestion + 1}</p>
            <div>
              <p className="question__text">
                {" "}
                {questions[currentQuestion].question}
              </p>
              <ul>
                {[
                  questions[currentQuestion].correct_answer,
                  ...questions[currentQuestion].incorrect_answers,
                ]
                  // .sort(() => Math.random() - 0.5)
                  .map((item, index) => (
                    <li className={`${answer===item ? 'selected': ''}`} onClick={() => setAnswer(item)} key={item}>{item}</li>
                  ))}
              </ul>
            </div>
          </div>
          </>
        ) : (
          <p> Loading ...</p>
        )}

        
        <div className="question__action">
            <div>
              <button onClick={() => nextQuestionHandler('mark_next')}>Mark for Review & Next</button>
              <button onClick={() => setAnswer("")}>Clear Response</button>
            </div>
            <div>
              <button className="save__btn" onClick={() => nextQuestionHandler('save_next')}>Save & Next</button>
          </div>
          <div className='submit__btn mobile-show'>
              <button onClick={() => setSubmitQuiz(true)}>Submit</button>
          </div>
        </div>

      </div>

      {submitQuiz && (
        <div className='submit__modal' onClick={() => setSubmitQuiz(false)}>
          <div onClick={handleSumitModal}>
                <p>Are you sure to end the quiz?</p>
                  <div className="submit__btnGroup">
                      <button onClick={() => navigateToQuizResult()}>Yes</button>
                      <button onClick={() => setSubmitQuiz(false)}>No</button>
                  </div>
          </div>
        </div>
          )}
    </>
  );
};

export default Question;
