import { authService } from "fbase"

const Profile = () => {

  const onLogOutClick = () => {
    authService.signOut();
  }

  return (
    <button onClick={onLogOutClick}>로그아웃</button>
  )
}

export default Profile