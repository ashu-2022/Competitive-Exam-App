import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectResult } from "../resultSlice";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const graphData = {
  labels: ["Right Answers", "Wrong Answers", "Not Answered"],
  datasets: [
    {
      label: "questions",
      data: [10, 10, 10],
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
  const [marksObj, setMarksObj] = useState({});
  const [attemptedObj, setAttemptedObj] = useState({});
  const [timeObj, setTimeObj] = useState({});
  const [graphObj, setGraphObj] = useState(graphData);

  useEffect(() => {
    if (Object.keys(ExamResult).length) {
      setInsight({
        ...insight,
        score: ExamResult.score,
        totalMarks: ExamResult.allQuest.length,
        totalQuest: ExamResult.allQuest.length,
        questAttempted:
          ExamResult.answeredCorrectQuest.length +
          ExamResult.answeredIncorrectQuest.length,
      });
    }
  }, [ExamResult]);

  useEffect(() => {
    if (Object.keys(insight).length) {
      setMarksObj({
        text: `${insight["score"]} / ${insight["totalMarks"]}`,
        perc: ((insight["score"] * 100) / insight["totalMarks"]).toFixed(2),
      });
      setAttemptedObj({
        text: `${insight["questAttempted"]} / ${insight["totalQuest"]}`,
        perc: (
          (insight["questAttempted"] * 100) /
          insight["totalQuest"]
        ).toFixed(2),
      });
      setTimeObj({
        text: `10:00 / 30:00`,
        perc: ((10 * 100) / 30).toFixed(2),
      });
      let graphData = [
        ExamResult.answeredCorrectQuest.length,
        ExamResult.answeredIncorrectQuest.length,
        insight.totalQuest - insight.questAttempted,
      ];
      setGraphObj({
        labels: ["Right Answers", "Wrong Answers", "Not Answered"],
        datasets: [
          {
            label: "questions",
            data: graphData,
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
      });
    }
  }, [insight]);

  return (
    <>
      {Object.keys(insight).length > 0 && (
        <>
          <div className="insights flex justify-start items-center flex-wrap gap-4">
            <div className="border-2 rounded-md border-gray-200 shadow-sm p-3 flex-1">
              <p className="text-sm">Marks</p>
              <p className="text-lg my-2 text-green-500">{marksObj["text"]}</p>
              <div className="h-[12px] w-full bg-gray-300 rounded-2xl">
                <div
                  className={classNames(
                    " bg-green-500 rounded-l-xl h-[12px]",
                    marksObj["perc"] > 97 ? "rounded-r-xl" : ""
                  )}
                  style={{ width: `${marksObj["perc"]}%` }}
                ></div>
              </div>
            </div>

            <div className="border-2 rounded-md border-gray-200 shadow-sm p-3 flex-1">
              <p className="text-sm">QUESTION ATTEMPTED</p>
              <p className={`text-lg my-2 text-orange-500`}>
                {attemptedObj["text"]}
              </p>
              <div className="h-[12px] w-full bg-gray-300 rounded-2xl">
                <div
                  className={classNames(
                    " bg-orange-500 rounded-l-xl h-[12px]",
                    attemptedObj["perc"] > 97 ? "rounded-r-xl" : ""
                  )}
                  style={{ width: `${attemptedObj["perc"]}%` }}
                ></div>
              </div>
            </div>

            <div className="border-2 rounded-md border-gray-200 shadow-sm p-3 flex-1">
              <p className="text-sm">TIME TAKEN (mins)</p>
              <p className={`text-lg my-2 text-red-500`}>{timeObj["text"]}</p>
              <div className="h-[12px] w-full bg-gray-300 rounded-2xl">
                <div
                  className={classNames(
                    " bg-red-500 rounded-l-xl h-[12px]",
                    timeObj["perc"] > 97 ? "rounded-r-xl" : ""
                  )}
                  style={{ width: `${timeObj["perc"]}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="md:w-[75%] lg:w-[50%] xl:w-[35%] mx-auto my-5">
            <Pie data={graphObj} />
          </div>
        </>
      )}
    </>
  );
};

export default OverallAnalysis;
