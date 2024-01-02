import React, { useState } from 'react'

function Game({question,lengthQuestion,goodAnswers,setGoodAnswers,setNumQuestion,numQuestion}) {

  if(question?.type === "multiple"){
    question?.incorrect_answers.push(question?.correct_answer) 
    shuffleArray(question?.incorrect_answers)
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const [questionValue, setQuestionValue] = useState(null)
  const [solution, setSolution] = useState(null)

  const checkAnswer = () => {
    if(questionValue === question?.correct_answer){
      setGoodAnswers(goodAnswers => goodAnswers ++)
      setSolution(true)
    }else{
      setSolution(false)
    }
  }

  const nextQuestion = () => {
    setNumQuestion(question => question++)
  }

  return (
    <div className='questions'>
      {(solution === true || solution === false) ? (
        <>
          <h3>Solution : {question?.correct_answer}</h3>
          <button onClick={nextQuestion} > {lengthQuestion === numQuestion ? "Résultat" : "Next" } </button>
        </>
      ):(
        <>
          <div className="title_question">
            <h3> {question?.question} </h3>
            <h5> {question?.category} </h5>
            <span> {question?.difficulty} </span>
          </div>
          <div className="">
            <label htmlFor="">Réponse</label>
            
              {question.type === "multiple" ? (
                <select name="" id="">
                {question?.incorrect_answers.map(q => (
                  <option onChange={(e) => setQuestionValue(e.target.value)} value={q} > {q} </option>
                ))}
                </select>
              ) : (
                <div className="">
                  <label htmlFor="true">True</label>
                  <input onChange={(e) => setQuestionValue(e.target.value)} value="True" type="radio" name="" id="true" />
                  <label htmlFor="false">False</label>
                  <input onChange={(e) => setQuestionValue(e.target.value)} value="False" type="radio" name="" id="false" />
                </div>
              )}
          </div>
          <button onClick={checkAnswer} >Commit</button>
        </>
      )}
    </div>
  )
}

export default Game