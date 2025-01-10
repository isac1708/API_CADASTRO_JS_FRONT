import './style.css'
import Trash from '../../assets/trash.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error)
      })
  }, [])
  return (
    <div className='container'>
      <form> 
        <h1>Cadastro de Usuários</h1>
        <input name = 'nome' type = 'text'/>
        <input name = 'email'  type= 'number'/>
        <input name = 'idade' type= 'email'/>
        <button type ='button'>Cadastrar</button>
      </form>

      <div>
        {users.map(user => (
          <div key={user.id}>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>Idade: {user.idade}</p>
            <button>
              <img src={Trash} className='trash-icon' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
//npm run dev para rodar o projeto