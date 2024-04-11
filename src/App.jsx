import { useState } from "react";
import "./App.css";
import questions from "./constants/questions.json";
import Question from "./components/question";
import Result from "./components/Result";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Handles selection of an answer and navigation to the next question
  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, isCorrect]);
  };

  // Handles navigation to the previous question
  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    // Remove the last answer from userAnswers array
    setUserAnswers(userAnswers.slice(0, -1));
  };

  const handleEndQuiz = () => {
    // If user hasn't answered the current question, submit the quiz without answering
    if (
      currentQuestion === questions.length &&
      userAnswers.length === currentQuestion
    ) {
      setCurrentQuestion(currentQuestion + 1); // Move to the Result component
    }
  };

  //RESETS THE QUIZ
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <h1>Random Quiz</h1>
      {/* Questions component */}
      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}
      {/* Results component */}
      {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}
      <div className="buttons-div">
        {/* Display Previous button if not on the first question and not on the result page */}
        {currentQuestion > 0 && currentQuestion < questions.length && (
          <button onClick={handlePreviousQuestion}>Previous</button>
        )}
        {/* Display Next button if not on the last question and not on the result page */}
        {currentQuestion < questions.length - 1 && currentQuestion >= 0 && (
          <button onClick={handleNextQuestion}>Next</button>
        )}
        {/* Display End Quiz button if on last question and not on the result page */}
        {currentQuestion === questions.length && (
          <button onClick={resetQuiz}>End Quiz</button>
        )}
      </div>
    </div>
  );
}

export default App;
