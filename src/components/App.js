import { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    // 로그인한 사람의 정보 받아오기
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setLoading(true)
    })
  }, [])

  return (
    <>
      {loading ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "loading..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
