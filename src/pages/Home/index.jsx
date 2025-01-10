import './style.css'
import Trash from '../../assets/trash.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [users, setUsers] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [idade, setIdade] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error)
      })
  }

  const addUser = () => {
    if (!nome || !email || !idade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const newUser = { name: nome, email, age: idade } 
    console.log('Adicionando usuário:', newUser) 
    axios.post('http://localhost:3000/usuarios', newUser)
      .then(() => {
        console.log('Usuário adicionado com sucesso') 
        setMessage('Usuário adicionado com sucesso!')
        fetchUsers()
        setNome('')
        setEmail('')
        setIdade('')
      })
      .catch(error => {
        console.error('Erro ao adicionar usuário:', error)
        setMessage('Erro ao adicionar usuário.')
      })
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/usuarios/${id}`)
      .then(() => {
        fetchUsers()
      })
      .catch(error => {
        console.error('Erro ao excluir usuário:', error)
      })
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={(e) => { e.preventDefault(); addUser(); }}> 
          <h1 className='labelTitle'>Cadastro de Usuários</h1>
          <div className='input-group'>
            <input 
              name='nome' 
              type='text' 
              placeholder='Nome' 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
            <input 
              name='idade' 
              type='number' 
              placeholder='Idade' 
              className='inputAge' 
              value={idade} 
              onChange={(e) => setIdade(e.target.value)} 
            />
          </div>
          <input 
            name='email' 
            type='email' 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>

      {message && <p>{message}</p>} {/* Exibe a mensagem */}

      <div className='users'>
        {users.slice(-2).map(user => (
          <div key={user.id}>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Idade: {user.age}</p>
            <button className='delete-button' onClick={() => deleteUser(user.id)}>
              <img src={Trash} className='trash-icon' alt='Excluir'/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
//npm run dev para rodar o projeto