/* eslint-disable react/prop-types */
const Result = ({ userAnswers, questions, resetQuiz = () => {} }) => {
  const correctAnswers = userAnswers.filter((answer) => answer).length;
  return (
    <div className="results">
      <h2>View Results Below</h2>
      <p>
        You answered {correctAnswers} out of {questions.length} questions
        correctly
        <span onClick={resetQuiz}>click here to Reset Quiz</span>
      </p>
      <ul>
        {questions.map((question, index) => {
          return (
            <li key={index} data-correct={userAnswers[index]}>
              Q{index + 1}. {question.question}
              <br />
              Answer is: {question.answers.find(answer => answer.isCorrect).text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Result;
