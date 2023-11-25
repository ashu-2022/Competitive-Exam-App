import { useDispatch, useSelector } from "react-redux";
import { selectAllQuestions, fetchAllQuestionsAsync } from "./questionSlice";
import { useEffect, useState } from "react";
import QuestionItems from "./components/QuestionItem";
import AnsTracking from "./components/AnsTracking";

const Question = () => {
  const Questions = useSelector(selectAllQuestions);
  console.log("Questions", Questions);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion]= useState([])


  useEffect(() => {
    dispatch(fetchAllQuestionsAsync());
  }, [dispatch]);


  useEffect(() => {
    if (Questions.length) {
        setCurrentQuestion({...Questions[0], sno:1})
    }
},[Questions])

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {/* {Questions?.map((quesItem, index) => (
          <QuestionItems key={index} question={quesItem} />
        ))} */}
        <QuestionItems question={currentQuestion}/>
      </div>
      <div className="grid grid-cols-1 gap-4 rounded-md bg-white">
        <AnsTracking Questions={Questions} setCurrentQuestion={setCurrentQuestion} />
      </div>
    </div>
  );
};

export default Question;
