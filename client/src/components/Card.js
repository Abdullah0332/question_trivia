import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { getLoggedInUser, getQuestion, updatePoints } from "../api";
import { useSearchParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card() {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getLoggedInUserFunc();
    getQuestionFunc();
  }, []);

  const getQuestionFunc = async () => {
    setLoading(true);
    let { data } = await getQuestion();
    setQuestion(data.results[0].question);
    setAnswers([
      ...data.results[0].incorrect_answers,
      data.results[0].correct_answer,
    ]);
    setCorrectAnswer(data.results[0].correct_answer);
    setLoading(false);
  };

  const getLoggedInUserFunc = async () => {
    let data = await getLoggedInUser(searchParams.get("id"));
    setName(data.data.name);
    setPoints(data.data.points);
  };

  const onSave = async () => {
    if (!selectedAnswer) {
      alert("Please Select One Answer");
    }
    if (correctAnswer === selectedAnswer) {
      setPoints((prev) => prev + 1);
      await updatePoints({ id: searchParams.get("id"), points: points + 1 });
      getQuestionFunc();
    }
    if (correctAnswer !== selectedAnswer) {
      alert("Wrong Answer");
      getQuestionFunc();
    }
  };

  return (
    <div className="h-full">
      <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <section aria-labelledby="plan-heading">
            <div className="shadow sm:overflow-hidden sm:rounded-md flex justify-between p-4">
              <div className="font-bold">Welcome Back {name}</div>
              <button
                disabled={loading && true}
                onClick={() => (window.location = "/")}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2"
              >
                Log Out
              </button>
            </div>
          </section>
          <section aria-labelledby="plan-heading">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              {loading ? (
                <div className="text-center py-32 font-bold">Loading...</div>
              ) : (
                <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="plan-heading"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {question.replace("&#039;", "'").replace("&quot;", '"')}
                    </h2>
                  </div>

                  <RadioGroup
                    value={selectedAnswer}
                    onChange={setSelectedAnswer}
                  >
                    <RadioGroup.Label className="sr-only">
                      Questionair
                    </RadioGroup.Label>
                    <div className="relative -space-y-px rounded-md bg-white">
                      {answers.map((answer, answerIdx) => (
                        <RadioGroup.Option
                          key={answerIdx}
                          value={answer}
                          className={({ checked }) =>
                            classNames(
                              answerIdx === 0
                                ? "rounded-tl-md rounded-tr-md"
                                : "",
                              answerIdx === answers.length - 1
                                ? "rounded-bl-md rounded-br-md"
                                : "",
                              checked
                                ? "bg-orange-50 border-orange-200 z-10"
                                : "border-gray-200",
                              "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid  focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span className="flex items-center text-sm">
                                <span
                                  className={classNames(
                                    checked
                                      ? "bg-orange-500 border-transparent"
                                      : "bg-white border-gray-300",
                                    active
                                      ? "ring-2 ring-offset-2 ring-gray-900"
                                      : "",
                                    "h-4 w-4 rounded-full border flex items-center justify-center"
                                  )}
                                  aria-hidden="true"
                                >
                                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                                </span>
                                <RadioGroup.Label
                                  as="span"
                                  className="ml-3 font-medium text-gray-900 w-fit"
                                >
                                  {answer
                                    .replace("&#039;", "'")
                                    .replace("&quot;", '"')}
                                </RadioGroup.Label>
                              </span>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                <p className="font-bold align-center pt-1">Points: {points}</p>
                <div>
                  <button
                    disabled={loading && true}
                    onClick={() => getQuestionFunc()}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2"
                  >
                    Next Question
                  </button>
                  <button
                    disabled={loading && true}
                    onClick={() => onSave()}
                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
