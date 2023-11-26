import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllQuestions } from "../../questions/questionSlice";
import { selectResult } from "../resultSlice";
import QAns from './QAns'
const AnswerMenu = [
  { name: "All", id: "allQuest" },
  { name: "Correct Answers", id: "answeredCorrectQuest" },
  { name: "Wrong Answers", id: "answeredIncorrectQuest" },
  { name: "Not Attempted Questions", id: "notAnsweredQuest" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const SolutionReport = () => {
    const Questions = useSelector(selectAllQuestions);
    const ExamResult = useSelector(selectResult)
    const [currentAnsView, setCurrentAnswerView] = useState("allQuest");
    const [examQuestions, setExamQuestions]= useState([])
    console.log("Questions Result", Questions);
    console.log("ExamResult", ExamResult)
    useEffect(() => {
        setExamQuestions(ExamResult[currentAnsView])
    },[currentAnsView, ExamResult])
  return (
    <div>
      <span className="isolate inline-flex flex-wrap rounded-md shadow-sm mb-5">
        {AnswerMenu?.map((tabItem, index) => (
          <button key={index}
            type="button"
            onClick={(e) => setCurrentAnswerView(tabItem.id)}
            className={classNames(
              "relative inline-flex items-center bg-white px-3 py-2 text-lg hover:bg-gray-50 focus:z-10 text-gray-500 hover:ring-1 hover:ring-inset hover:ring-gray-300",
              //   index === 0 ? "rounded-l-md" : "rounded-r-md",
              currentAnsView === tabItem.id
                ? "text-indigo-600 border-b-2 border-indigo-600 ring-1 ring-inset ring-gray-300 bg-slate-100"
                : "text-gray-900"
            )}
          >
            {tabItem.name}
          </button>
        ))}
          </span>
          <div>
              {examQuestions.length > 0 && <QAns questionList={ examQuestions} />}
          </div>
    </div>
  );
};

export default SolutionReport;
