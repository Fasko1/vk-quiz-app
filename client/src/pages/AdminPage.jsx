import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

function AdminPage() {
  const [roomCode, setRoomCode] = useState("")
  const [players, setPlayers] = useState([])

  useEffect(() => {
    socket.emit("createRoom")

    socket.on("roomCreated", (code) => {
      setRoomCode(code)
    })

    socket.on("playersUpdated", (updatedPlayers) => {
      setPlayers(updatedPlayers)
    })
  }, [])

  function startQuiz() {
    socket.emit("startQuiz", roomCode)
  }

  function nextQuestion() {
    socket.emit("nextQuestion", roomCode)
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Панель организатора</h1>

        <h2>Код комнаты:</h2>
        <h1>{roomCode}</h1>

        <button onClick={startQuiz}>
          Начать квиз
        </button>

        <button onClick={nextQuestion}>
          Следующий вопрос
        </button>

        <h2>Игроки:</h2>

        {players.map((player, index) => (
          <p key={index}>
            {player.name} — {player.score} баллов
          </p>
        ))}
      </div>
    </div>
  )
}

export default AdminPage