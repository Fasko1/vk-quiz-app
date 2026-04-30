import { useEffect, useState } from "react"

function QuizPage() {
  const [quiz, setQuiz] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data[0])
      })
  }, [])

  if (!quiz) {
    return <h1>Загрузка...</h1>
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{quiz.title}</h1>

        <h2>{quiz.question}</h2>

        <div className="answers">
          {quiz.answers.map((answer, index) => (
            <button key={index}>
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizPage