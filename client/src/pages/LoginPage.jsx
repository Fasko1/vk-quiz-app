import { Link } from "react-router-dom"

function LoginPage() {
  return (
    <div className="page">
      <div className="card">
        <h1>Вход</h1>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />

        <button>Войти</button>

        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage