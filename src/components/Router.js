import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import Navigation from 'components/Navigation'

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path='/' element={<Home userObj={userObj} />} />
            <Route exact path='/profile' element={<Profile />} />
          </>
        ) : (
          <Route exact path='/' element={<Auth />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  )
}

export default AppRouter