import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route exact path='/' element={<Home />} />

        ) : (
          <Route exact path='/' element={<Auth />} />
        )}

      </Routes>
    </BrowserRouter >
  )
}

export default AppRouter