import { userIcon } from "../../../assets";
import { selectUserInfo } from "../../user/userSlice";
import { useSelector } from "react-redux";
import { selectAllQuestions } from "../questionSlice";
import { useEffect, useState } from "react";
const AnsTracking = ({ Questions, setCurrentQuestion }) => {
  const user = useSelector(selectUserInfo);
  // const Questions = useSelector(selectAllQuestions);
  const viewQuestionHandler = (e, index, quesObj) => {
    setCurrentQuestion({ ...quesObj, sno: index + 1 });
  };

  return (
    <>
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
            <span
              onClick={(e) => viewQuestionHandler(e, index, quesObj)}
              className="bg-yellow-500 p-3 min-w-[60px] text-center rounded-md text-2xl cursor-pointer"
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      <div className=" border-2 border-yellow-800 p-4 mx-4 md:mx-12 flex justify-start gap-2 flex-wrap">
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className="rounded-2xl bg-green-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">1</span>Answered
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-red-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">1</span>Not Answered
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-yellow-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">1</span>Not Visited
        </div>
        <div className="bg-gray-100 border-2 px-2 py-1 rounded-lg">
          <span className=" bg-purple-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">1</span> Marked
        </div>
        <div className="flex justify-center items-center bg-gray-100 border-2 px-2 py-1 rounded-lg ">
          <span className=" bg-pink-600 inline-block min-w-[30px] min-h-[30px] text-center mr-2 text-white align-middle">1</span>
          <div>
            <p>Answered & Marked for Review</p>
            <p>(will be consider for evaluation)</p>
          </div>
        </div>
          </div>
          <div className="text-center">
          <button
        type="button"
        className="rounded-md min-w-[80%] text-xl bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
            Submit
      </button>
            </div>
    </>
  );
};

export default AnsTracking;
