import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectResult } from "../resultSlice";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const graphData = {
  labels: ["Right Answers", "Wrong Answers", "Not Answered"],
  datasets: [
    {
      label: "questions",
      data: [5, 7, 3],
      backgroundColor: [
        "rgba(255, 99, 132,0.9)",
        "rgba(54, 162, 235,0.9)",
        "rgba(255, 205, 86,0.9)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      borderWidth: 1,
    },
  ],
};

const OverallAnalysis = () => {
  const ExamResult = useSelector(selectResult);
  console.log("ExamResult", ExamResult);
  const [insight, setInsight] = useState({});
    useEffect(() => {
        if (Object.keys(ExamResult).length) {
            setInsight({
                ...insight,
                score: ExamResult.score,
                totalMarks: ExamResult.allQuest.length,
                totalQuest: ExamResult.allQuest.length,
                questAttempted:
                  ExamResult.answeredCorrectQuest.length + ExamResult.answeredIncorrectQuest.length,
              });
      }

    }, [ExamResult]);
    console.log("insight", insight)
  return (
    <>
          {Object.keys(insight).length > 0 && (<div className="insights flex justify-start items-center flex-wrap gap-4">
              <InsightItem
                  title={"Marks"}
                  desc={insight.score / insight.totalMarks}
                  color={"green"}
              />
              <InsightItem
                  title={"QUESTION ATTEMPTED"}
                  desc={insight.questAttempted / insight.totalQuest}
                  color={"yellow"}
              />
              <InsightItem
                  title={"TIME TAKEN (mins)"}
                  desc={"20:55/30:00"}
                  color={"red"}
              />
          </div>)}
      <div className="md:w-[75%] lg:w-[50%] xl:w-[35%] mx-auto my-5">
        <Pie data={graphData} />;
      </div>
    </>
  );
};

export default OverallAnalysis;

const InsightItem = ({ title, desc, color }) => {
  return (
    <div className="border-2 rounded-md border-gray-200 shadow-sm p-3 flex-1">
      <p className="text-sm">{title}</p>
      <p className={`text-lg my-2 text-${color}-500`}>{desc}</p>
      <div className="h-[12px] w-full bg-gray-300 rounded-2xl">
        <div className={`h-[12px] w-[50%] bg-${color}-500 rounded-l-xl`}></div>
      </div>
    </div>
  );
};
