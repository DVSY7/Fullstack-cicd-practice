import { useEffect, useState } from "react";
import axios from 'axios';

const API = 'http://43.201.107.65:3000/user'

export const App = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')

  // 목록 조회
  const fetchUsers = async () => {
    const res = await axios.get(API)
    setUsers(res.data)
  }

  // 추가
  const createUser = async () => {
    if (!name.trim()) return
    await axios.post(API, { name })
    setName('')
    fetchUsers()
  }

  // 삭제 
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{ padding: '40px' }}>
      <h1>User CRUD v2</h1>

      {/* 추가 */}
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
        />
        <button onClick={createUser}>추가</button>
      </div>

      {/* 목록 */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name}
            <button onClick={() => deleteUser(user.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;