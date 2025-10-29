import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/landing-page')
  }

  return <>
  <div className="usuario-container">
    <h1>Cadastro</h1>
    <div className="block">
      <p>Preencha os campos para criar uma nova conta</p>
      <form  className='campos' onSubmit={handleRegister}>
          <div>
              <label htmlFor="username">Usuário</label>
              <input type="text" id="username" name="username" />
          </div>
          <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
          </div>
          <div>
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Registrar</button>
      </form>
      <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  </div>
  </>;
}