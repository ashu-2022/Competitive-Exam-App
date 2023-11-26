import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const QAnsItem = ({ question, index }) => {
  let {
    difficulty,
    question: questionText,
    incorrect_answers,
    correct_answer,
    userAnswer,
  } = question;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * 4);
    let tempOption = [...incorrect_answers];
    tempOption.splice(randomIndex, 0, correct_answer);
    setOptions(tempOption);
  }, [correct_answer,incorrect_answers]);

  return (
    <div className="QAns ">
      <div className="">
        <div className="drop-shadow-sm border-2 rounded-lg mb-10 border-gray-100 bg-white px-4 py-5 sm:px-6">
          <div>
            <span
              className={classNames(
                difficulty === "easy"
                  ? "text-green-700 bg-green-100 ring-green-600/20"
                  : "",
                difficulty === "medium"
                  ? "text-yellow-700 bg-yellow-100 ring-green-600/20"
                  : "",
                difficulty === "hard"
                  ? "text-red-700 bg-red-100 ring-red-600/20"
                  : "",

                "inline-flex items-center rounded-md  px-2 py-1 my-1 text-xs font-medium  ring-2 ring-inset"
              )}
            >
              {difficulty}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Q{index + 1}). {questionText}
          </h3>
          <div className="my-4">
            <RadioGroup>
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
                        "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between",
                        option === correct_answer
                          ? "border-2 border-green-500 "
                          : "",
                        userAnswer &&
                          userAnswer !== correct_answer &&
                          userAnswer === option
                          ? "border-2 border-red-500"
                          : ""
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span className="flex justify-between items-center flex-wrap gap-4 w-full">
                          <span className="flex flex-col text-sm">
                            <RadioGroup.Label
                              as="span"
                              className={classNames(
                                "font-medium text-gray-900 text-base",
                                option === correct_answer
                                  ? "text-green-500"
                                  : "",
                                userAnswer &&
                                  userAnswer !== correct_answer &&
                                  userAnswer === option
                                  ? "text-red-500"
                                  : ""
                              )}
                            >
                              {option}
                            </RadioGroup.Label>
                          </span>
                          {option === correct_answer ? (
                            <div className="text-base text-green-500 font-semibold flex items-center gap-1">
                                            Correct Option
                                            { userAnswer===option?
                                                
                                                (<>
                                                    <span className="text-green-500 text-[14px] px-0.5">|</span>
                                                    <span className="flex-shrink-0">
                                                    <CheckCircleIcon
                                                        className="h-5 w-5 text-green-400"
                                                        aria-hidden="true"
                                                    />
                                                    
                                                </span> <span>Attempted</span></>):null
                                            }
                            </div>
                          ) : null}
                          {userAnswer &&
                          userAnswer !== correct_answer &&
                          userAnswer === option ? (
                            <div className="text-red-500 text-[14px] flex items-center gap-1">
                              Your answer is{" "}
                              <span className=" font-semibold">Wrong</span>
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
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
        </div>
      </div>
    </div>
  );
};

const QAns = ({questionList}) => {
  return (
    <>
      {questionList.map((item, index) => (
        <QAnsItem question={item} index={index} key={index} />
      ))}
    </>
  );
};

export default QAns;

const TempUserSubmission = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question: "What was the main currency in Club Penguin?",
    correct_answer: "Coins",
    incorrect_answers: ["Stamps", "Tickets", "Gems"],
    userAnswer: "Stamps",
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Music",
    question: "What is the last song on the first Panic! At the Disco album?",
    correct_answer: "Build God, Then We&#039;ll Talk",
    incorrect_answers: [
      "Nails for Breakfast, Tacks for Snacks",
      "I Write Sins Not Tragedies",
      "Lying Is The Most Fun A Girl Can Have Without Taking Her Clothes Off",
    ],
    userAnswer: "I Write Sins Not Tragedies",
    userAnswerType: "marked_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Film",
    question: "Which one of these action movies are shot entirely in one take?",
    correct_answer: "Victoria",
    incorrect_answers: [
      "Ip Man 2",
      "The Bourne Legacy",
      "L&eacute;on: The Professional",
    ],
    userAnswer: "The Bourne Legacy",
    userAnswerType: "marked_next",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science &amp; Nature",
    question: "Which is the longest bone in the human body? ",
    correct_answer: "Femur",
    incorrect_answers: ["Scapula", "Fibula", "Ulna"],
    userAnswer: "Fibula",
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Sports",
    question:
      "In the 2014 FIFA World Cup, what was the final score in the match Brazil - Germany?",
    correct_answer: "1-7",
    incorrect_answers: ["1-5", "1-6", "2-6"],
    userAnswer: "1-6",
    userAnswerType: "marked_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question:
      "What is the name of the common, gun-toting enemies of the &quot;Oddworld&quot; video game series?",
    correct_answer: "Sligs",
    incorrect_answers: ["Scrabs", "Slogs", "Glukkons"],
    userAnswer: "Glukkons",
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Music",
    question:
      "Which of these artists has NOT been a member of dancehall group Major Lazer?",
    correct_answer: "Skrillex",
    incorrect_answers: ["Diplo", "Jillionaire", "Walshy Fire"],
    userAnswer: "Walshy Fire",
    userAnswerType: "marked_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Sports",
    question: "What year was hockey legend Wayne Gretzky born?",
    correct_answer: "1961",
    incorrect_answers: ["1965", "1959", "1963"],
    userAnswer: null,
    userAnswerType: "marked_next",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Video Games",
    question: "In Animal Crossing, who is the manager of the town shop?",
    correct_answer: "Tom Nook",
    incorrect_answers: ["Mr. Resetti", "Gracie", "K.K. Slider"],
    userAnswer: null,
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Japanese Anime &amp; Manga",
    question:
      "Which Japanese music group was formed to produce theme music for the anime &quot;Guilty Crown&quot;?",
    correct_answer: "Egoist",
    incorrect_answers: ["Goose house", "Babymetal", "Garnidelia"],
    userAnswer: null,
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Entertainment: Video Games",
    question:
      "How many voice channels does the Nintendo Entertainment System support natively?",
    correct_answer: "5",
    incorrect_answers: ["4", "6", "3"],
    userAnswer: null,
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Music",
    question: "How many studio albums have the duo Daft Punk released?",
    correct_answer: "4",
    incorrect_answers: ["1", "5", "2"],
    userAnswer: null,
    userAnswerType: "saved_next",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Entertainment: Board Games",
    question:
      "What Magic: The Gathering card&#039;s flavor text is just &#039;Ribbit.&#039;?",
    correct_answer: "Turn to Frog",
    incorrect_answers: ["Spore Frog", "Bloated Toad", "Frogmite"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question:
      "In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?",
    correct_answer: "Drill Containment Unit",
    incorrect_answers: ["Anti-Gravity Hook", "Influx Waver", "Cosmic Car Key"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Video Games",
    question: "Which Animal Crossing game was for the Nintendo Wii?",
    correct_answer: "Animal Crossing: City Folk",
    incorrect_answers: [
      "Animal Crossing: New Leaf",
      "Animal Crossing: Wild World",
      "Animal Crossing: Population Growing!",
    ],
    userAnswer: "Animal Crossing: City Folk",
    userAnswerType: "saved_next",
  },
];
