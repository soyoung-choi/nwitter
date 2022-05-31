import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = ({ userObj }) => {

  return (
    <nav id="nav">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="1x" />
            Home
          </Link>
        </li>
        <li>
          {/* displayName은 구글이나 깃허브에 가입한 이름 값 */}
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} color={"#04aaff"} size="1x" />
            {userObj.displayName ? userObj.displayName : userObj.email}님의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation