import React, { useState } from 'react';
import './App.css';
import questions from './Data';

const App = () => {
  
  const [qno, setQno] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(questions.length);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }

    setQno(qno+1);
    
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(null);
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => (
      <div key={index} className="option flex gap-3 align-items-center ">
        <input
          type="radio"
          id={option}
          name="answer"
          value={option}
          checked={selectedAnswer === option}
          onChange={() => handleAnswerSelect(option)}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    ));
  };

  return (
    <>
    <h1 className='text-center text-3xl font-bold mt-8'>Quiz App</h1>
    <h1 className='text-center text-2xl font-bold '>Play with fun</h1>
    <div className="quiz-container">
      
      {currentQuestion < questions.length ? (
        <>

          <h2 className='flex gap-2 text-xl'><span>Q.{qno}</span>{questions[currentQuestion].question}</h2>
          <div className="options text-lg ml-8 mt-4 mb-5">{renderOptions()}</div>
          <div className="button-container justify-between flex">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full px-8' onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
            {"< Prev"}
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleNextQuestion} className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full px-8">
                Submit
              </button>
            ) : (
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full px-8' onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                {"Next >"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className='text-2xl  text-center'>
          <h2 className='m-5'>Quiz Completed !</h2>
          <p>Your Score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default App;
