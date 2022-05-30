import { useState } from 'react'
import { authService, firebaseInstance } from 'fbase'
import AuthForm from 'components/AuthForm'

const Auth = () => {

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
      <AuthForm />
      <div>
        <button name="goggle" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth