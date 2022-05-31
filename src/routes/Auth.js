import { authService, firebaseInstance } from 'fbase'
import AuthForm from 'components/AuthForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    <div className="auth-container">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="auth-btns">
        <button onClick={onSocialClick} name="google" className="auth-btn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>

        <button onClick={onSocialClick} name="github" className="auth-btn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}

export default Auth