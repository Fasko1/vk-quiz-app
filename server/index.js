const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("VK Quiz API работает")
})

app.get("/api/quizzes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Первый квиз",
      question: "Какой язык используется в React?",
      answers: ["Python", "JavaScript", "C++", "Java"],
      correctAnswer: "JavaScript"
    }
  ])
})

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`)
})