import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function QuestionItem({ question, key }) {
  console.log("question", question);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
      if (Object.keys(question).length) {
        let randomIndex = Math.floor(Math.random() * 4);
        let tempOption = [...question.incorrect_answers];
        tempOption.splice(randomIndex, 0, question.correct_answer);
        setOptions(tempOption);
    }
  }, [question]);

  return (
    <>
      <div className="px-8 my-4">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div>
            <span
              className={classNames(
                question.difficulty === "easy"
                  ? "text-green-700 bg-green-100 ring-green-600/20"
                  : "",
                question.difficulty === "medium"
                  ? "text-yellow-700 bg-yellow-100 ring-green-600/20"
                  : "",
                question.difficulty === "hard"
                  ? "text-red-700 bg-red-100 ring-red-600/20"
                  : "",

                "inline-flex items-center rounded-md  px-2 py-1 my-1 text-xs font-medium  ring-2 ring-inset"
              )}
            >
              {question.difficulty}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Q{question.sno}). {question.question}
          </h3>
          <div className="my-4">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-y-4">
                {options?.map((option) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "border-indigo-600 ring-2 ring-indigo-600"
                          : "border-gray-300",
                        "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span className="flex items-center">
                          <span className="flex flex-col text-sm">
                            <RadioGroup.Label
                              as="span"
                              className="font-medium text-gray-900"
                            >
                              {option}
                            </RadioGroup.Label>
                          </span>
                        </span>
                        <span
                          className={classNames(
                            active ? "border" : "border-2",
                            checked
                              ? "border-indigo-600"
                              : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-between flex-col sm:flex-row gap-4 mt-6 py-2">
            <div className="flex justify-start gap-4 flex-wrap">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-indigo-600 hover:border hover:border-indigo-600"
              >
                Mark for Review & Next
              </button>
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-indigo-600 hover:border hover:border-indigo-600"
              >
                Clear Response
              </button>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default QuestionItem;
