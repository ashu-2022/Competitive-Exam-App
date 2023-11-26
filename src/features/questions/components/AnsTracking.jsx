import { userIcon } from "../../../assets";
import { selectUserInfo } from "../../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserActivity } from '../questionSlice'
import { submitExam } from '../../result/resultSlice';
import DialogModal from "./DialogModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AnsTracking = ({ Questions, setCurrentQuestion, setCurrentQuestIndex }) => {
  const [open, setOpen] = useState(false)
  const [quizEnd, setQuizEnd] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (quizEnd) {
      dispatch(submitExam(Questions));
      navigate('/quiz-result');
    }
  },[quizEnd, navigate, dispatch])

  const user = useSelector(selectUserInfo);
  const viewQuestionHandler = (e, index, quesObj) => {
    let nextQuestIndex = (index % 15);
    setCurrentQuestIndex(nextQuestIndex)
  };


  const UserActivity = useSelector(selectUserActivity)
  // console.log("UserActivity", UserActivity)
  // saved_next
  const findClassForQuestion = (quesObj) => {
    let ansClass = "bg-yellow-500"; // Not Visited
    let { userAnswer, userAnswerType } = quesObj;
    if (userAnswer === null) {
      if(userAnswerType==='marked_next') ansClass = 'bg-purple-600'
      else if(userAnswerType==='saved_next') ansClass = 'rounded-[25%] bg-red-600'
    } else {
      if(userAnswerType==='saved_next') ansClass = 'rounded-[50%] bg-emerald-500'
      else if(userAnswerType==='marked_next') ansClass = 'rounded-[50%] bg-cyan-400'
    }
    return ansClass
  }

  return (
    <>
      {open &&  <DialogModal open={open} setOpen={setOpen} setQuizEnd={setQuizEnd} />
}
      <div className="p-2 md:p-4">
        <img
          className="h-12 w-12 mx-auto flex-none rounded-full bg-gray-50"
          src={userIcon}
          alt=""
        />

        <p className="mt-1 text-center truncate text-sm leading-5 text-gray-500">
          {user.email}
        </p>
      </div>
      <div className="border-2 border-indigo-600 p-4 mx-4 md:mx-12">
        <h1 className="text-xl leading-6 mb-4 text-center">Choose a Question</h1>
        <div className="flex justify-center flex-wrap gap-4 ">
          {Questions.map((quesObj, index) => (
            <span key={index}
              onClick={(e) => viewQuestionHandler(e, index, quesObj)}
              className={classNames(
                findClassForQuestion(quesObj),
                "p-3 min-w-[60px] text-center rounded-md text-2xl cursor-pointer text-white"
              )}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      <div className=" border-2 border-yellow-800 p-4 mx-4 md:mx-12 flex justify-start gap-2 flex-wrap">
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className="rounded-[50%] bg-emerald-500 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">{UserActivity?.answered}</span>Answered
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-red-600 rounded-[25%] inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">{UserActivity?.not_answered}</span>Not Answered
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-yellow-500 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">{UserActivity?.not_visited}</span>Not Visited
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-purple-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">{UserActivity?.marked}</span> Marked
        </div>
        <div className="flex justify-center items-center bg-gray-100 border-2 px-2 py-1 rounded-lg ">
          <span className="rounded-[50%] bg-cyan-400 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">{UserActivity?.answered_marked_review}</span>
          <div>
            <p>Answered & Marked for Review</p>
            <p>(will be consider for evaluation)</p>
          </div>
        </div>
          </div>
          <div className="text-center">
          <button
          type="button"
          onClick={()=> setOpen(true)}
        className="rounded-md min-w-[80%] text-xl bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
            Submit
      </button>
      </div>
    </>
  );
};

export default AnsTracking;
