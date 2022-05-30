import { useState } from 'react'
import { authService } from 'fbase'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data

      if (newAccount) {
        // 회원가입
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="email" value={email} onChange={onChange} required />
        <input type="password" name="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        <p>{error}</p>
      </form>
      <div>
        <span onClick={toggleAccount}>
          {newAccount ? "로그인" : "회원가입"}
        </span>
      </div>
    </>
  )
}

export default AuthForm