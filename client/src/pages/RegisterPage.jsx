import { Link } from "react-router-dom"

function RegisterPage() {
  return (
    <div className="page">
      <div className="card">
        <h1>Регистрация</h1>

        <input type="text" placeholder="Имя" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />

        <button>Зарегистрироваться</button>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage