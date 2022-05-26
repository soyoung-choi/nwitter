import { useState } from 'react'
import { authService, firebaseInstance } from 'fbase'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const toggleAccount = () => setNewAccount((prev) => !prev)

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
      let data;
      if (newAccount) {
        // 회원가입
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const onSocialClick = async (e) => {
    const { name } = e.target

    let provider;

    if (name === 'goggle') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    await authService.signInWithPopup(provider)
  }

  return (
    <div>
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
      <div>
        <button name="goggle" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth