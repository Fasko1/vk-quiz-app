import { useState } from "react"

function AdminPage() {
  const [quizTitle, setQuizTitle] = useState("")
  const [question, setQuestion] = useState("")

  function createQuiz() {
    alert(`Квиз "${quizTitle}" создан!`)
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Панель организатора</h1>

        <input
          type="text"
          placeholder="Название квиза"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Вопрос"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input type="text" placeholder="Ответ 1" />
        <input type="text" placeholder="Ответ 2" />
        <input type="text" placeholder="Ответ 3" />
        <input type="text" placeholder="Ответ 4" />

        <button onClick={createQuiz}>
          Создать квиз
        </button>
      </div>
    </div>
  )
}

export default AdminPage