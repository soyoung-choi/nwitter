import { Link } from "react-router-dom"

const Navigation = ({ userObj }) => {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* displayName은 구글이나 깃허브에 가입한 이름 값 */}
          <Link to="/profile">{userObj.displayName ? userObj.displayName : userObj.email}님의 Profile</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation