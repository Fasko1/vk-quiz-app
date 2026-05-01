const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

const PORT = 5000

app.use(cors())
app.use(express.json())

const quiz = {
  title: "Первый квиз",
  questions: [
    {
      question: "Какой язык используется в React?",
      answers: ["Python", "JavaScript", "C++", "Java"],
      correctAnswer: "JavaScript"
    },
    {
      question: "Что используется для создания backend на JavaScript?",
      answers: ["Node.js", "Photoshop", "Excel", "Figma"],
      correctAnswer: "Node.js"
    }
  ]
}

const rooms = {}

app.get("/", (req, res) => {
  res.send("VK Quiz API работает")
})

app.get("/api/quizzes", (req, res) => {
  res.json([quiz])
})

io.on("connection", (socket) => {
  console.log("Пользователь подключился:", socket.id)

  socket.on("createRoom", () => {
    const roomCode = "ROOM123"

    rooms[roomCode] = {
      players: {},
      currentQuestion: 0,
      isStarted: false
    }

    socket.join(roomCode)
    socket.emit("roomCreated", roomCode)

    console.log("Комната создана:", roomCode)
  })

  socket.on("joinRoom", ({ roomCode, playerName }) => {
    if (!rooms[roomCode]) {
      socket.emit("errorMessage", "Комната не найдена")
      return
    }

    socket.join(roomCode)

    rooms[roomCode].players[socket.id] = {
      name: playerName,
      score: 0
    }

    io.to(roomCode).emit("playersUpdated", Object.values(rooms[roomCode].players))

    console.log(`${playerName} подключился к комнате ${roomCode}`)
  })

  socket.on("startQuiz", (roomCode) => {
    const room = rooms[roomCode]
    if (!room) return

    room.isStarted = true
    room.currentQuestion = 0

    io.to(roomCode).emit("questionChanged", quiz.questions[0])
  })

  socket.on("nextQuestion", (roomCode) => {
    const room = rooms[roomCode]
    if (!room) return

    room.currentQuestion += 1

    if (room.currentQuestion >= quiz.questions.length) {
      io.to(roomCode).emit("quizFinished", Object.values(room.players))
      return
    }

    io.to(roomCode).emit("questionChanged", quiz.questions[room.currentQuestion])
  })

  socket.on("sendAnswer", ({ roomCode, answer }) => {
    const room = rooms[roomCode]
    if (!room || !room.players[socket.id]) return

    const currentQuestion = quiz.questions[room.currentQuestion]

    if (answer === currentQuestion.correctAnswer) {
      room.players[socket.id].score += 1
    }

    io.to(roomCode).emit("playersUpdated", Object.values(room.players))
  })

  socket.on("disconnect", () => {
    console.log("Пользователь отключился:", socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`)
})