import { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [loading, setLoading] = useState(false)
  const [userObj, setUserObj] = useState(null)

  const refreshUser = () => {
    const user = authService.currentUser

    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  useEffect(() => {
    // 로그인한 사람의 정보 받아오기
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(false)
      }
      setLoading(true)
    })
  }, [])

  return (
    <>
      {loading ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          refreshUser={refreshUser}
          userObj={userObj}
        />
      ) : (
        'loading...'
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
