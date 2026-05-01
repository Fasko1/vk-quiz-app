import { useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

function QuizPage() {
  const [roomCode, setRoomCode] = useState("ROOM123")
  const [playerName, setPlayerName] = useState("")
  const [joined, setJoined] = useState(false)
  const [question, setQuestion] = useState(null)
  const [players, setPlayers] = useState([])
  const [finished, setFinished] = useState(false)

  socket.on("questionChanged", (newQuestion) => {
    setQuestion(newQuestion)
    setFinished(false)
  })

  socket.on("playersUpdated", (updatedPlayers) => {
    setPlayers(updatedPlayers)
  })

  socket.on("quizFinished", (finalPlayers) => {
    setPlayers(finalPlayers)
    setFinished(true)
    setQuestion(null)
  })

  socket.on("errorMessage", (message) => {
    alert(message)
  })

  function joinRoom() {
    socket.emit("joinRoom", {
      roomCode,
      playerName
    })

    setJoined(true)
  }

  function sendAnswer(answer) {
    socket.emit("sendAnswer", {
      roomCode,
      answer
    })
  }

  if (!joined) {
    return (
      <div className="page">
        <div className="card">
          <h1>Подключение к квизу</h1>

          <input
            type="text"
            placeholder="Ваше имя"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Код комнаты"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />

          <button onClick={joinRoom}>Подключиться</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Комната {roomCode}</h1>

        {!question && !finished && (
          <p>Ожидание запуска квиза организатором...</p>
        )}

        {question && (
          <>
            <h2>{question.question}</h2>

            <div className="answers">
              {question.answers.map((answer, index) => (
                <button key={index} onClick={() => sendAnswer(answer)}>
                  {answer}
                </button>
              ))}
            </div>
          </>
        )}

        <h2>Лидерборд</h2>

        {players.map((player, index) => (
          <p key={index}>
            {player.name} — {player.score} баллов
          </p>
        ))}

        {finished && <h2>Квиз завершён!</h2>}
      </div>
    </div>
  )
}

export default QuizPage