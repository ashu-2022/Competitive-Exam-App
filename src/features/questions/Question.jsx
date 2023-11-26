import { useDispatch, useSelector } from "react-redux";
import { selectAllQuestions, fetchAllQuestionsAsync } from "./questionSlice";
import { useEffect, useState } from "react";
import QuestionItems from "./components/QuestionItem";
import AnsTracking from "./components/AnsTracking";
import { updateQuestionState} from './questionSlice'

const Question = () => {
  const Questions = useSelector(selectAllQuestions);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion]= useState({})
  const [currentQuestIndex, setCurrentQuestIndex]= useState(0)

  useEffect(() => {
    let questObj = Questions[currentQuestIndex]
    setCurrentQuestion({ ...questObj, sno: currentQuestIndex + 1 })
    if (questObj) {
      if (!('userAnswer' in questObj)) {
        let dispatchInitObj = { ...questObj, 'userAnswer': null, 'userAnswerType': 'saved_next' }
        dispatch(updateQuestionState(dispatchInitObj))
      }
    }

  }, [dispatch, Questions, currentQuestIndex])

  useEffect(() => {
    dispatch(fetchAllQuestionsAsync());
  }, [dispatch]);



  

  return (
    <>
      {
        Object.keys(currentQuestion).length>1 && 
          (<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <QuestionItems question={currentQuestion} setCurrentQuestIndex={setCurrentQuestIndex} />
          </div>
          <div className="grid grid-cols-1 gap-4 rounded-md bg-white">
            <AnsTracking Questions={Questions} setCurrentQuestion={setCurrentQuestion} setCurrentQuestIndex={setCurrentQuestIndex} />
          </div>
        </div>)

      }

    </>

  );
};

export default Question;
