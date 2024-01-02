import { useEffect, useState } from 'react'
import Game from '../Game/Game'

function Home() {

    const [questions,setQuestions] = useState([])
    const [level,setLevel] = useState("")
    const [cat,setCat] = useState("")
    const [type,setType] = useState("")
    const [numQuestion,setNumQuestion] = useState(1)
    const [lengthQuestion,setLengthNumQuestion] = useState(null)
    const [goodAnswers, setGoodAnswers] = useState(0)

    const fetchApi = async () => {
      const res = await fetch(`https://opentdb.com/api.php?${level ? `difficulty=${level}&` : ""}${cat ? `category=${cat}&` : ""}${type ? `type=${type}&` : ""}
      ${numQuestion ? `amount=${numQuestion}` : ""}`)
      const data = await res.json()
      setQuestions(data.results)
      setLengthNumQuestion(data.results.length)
    }
  
    console.log(questions);

  return (
    <>
    {questions.length === 0 ? (
      <div className="container">
        <div className="titleApp">
          <h1>Quiz App</h1>
        </div>
        <div className="body">
          <h2>Sélectionner vos critères</h2>
          <input onChange={(e) =>setNumQuestion(e.target.value)} min={1} defaultValue={1} type="number" name="" id="" placeholder='choose number of questions' />
          <label htmlFor="category"></label>
          <select onChange={(e) =>setCat(e.target.value)} name="" id="category">
            <option value="">All</option>
            <option value="21">Sports</option>
            <option value="25">Art</option>
            <option value="23">History</option>
            <option value="27">Vehicles</option>
          </select>
          <label htmlFor="level">Niveau</label>
          <select onChange={(e) =>setLevel(e.target.value)} name="" id="level">
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="type">Type</label>
          <select onChange={(e) =>setType(e.target.value)} name="" id="type">
            <option value="">All</option>
            <option value="multiple">Multiple choice</option>
            <option value="boolean">True/False</option>
          </select>
          <button onClick={fetchApi}>Play</button>
        </div>
      </div>
    ) : (
      questions?.map(question => (
        <Game key={question.question} lengthQuestion={lengthQuestion} numQuestion={numQuestion} setNumQuestion={setNumQuestion} question={question} goodAnswers={goodAnswers} setGoodAnswers={setGoodAnswers} />
      ))
    )}
    </>
  )
}

export default Home