import { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user)
      } else {
        setIsLoggedIn(false)
      }
      setLoading(true)
    })
  }, [])

  return (
    <>
      {loading ? <AppRouter isLoggedIn={isLoggedIn} /> : "loading..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
