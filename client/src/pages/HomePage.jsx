import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="home">
      <h1>VK Quiz App</h1>

      <p>Платформа для онлайн-квизов в реальном времени</p>

      <div className="buttons">
        <Link to="/admin">
          <button>Создать квиз</button>
        </Link>

        <Link to="/quiz">
          <button>Подключиться</button>
        </Link>

        <Link to="/login">
          <button>Войти</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage