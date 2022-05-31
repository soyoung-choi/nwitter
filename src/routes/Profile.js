import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService, dbService } from "fbase"
import Nweet from 'components/Nweet'

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const [nweets, setNweets] = useState('')

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/')
  }

  const getMyNweets = async () => {
    const myNweets = await dbService
      .collection('nweet')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'asc')
      .get()

    setNweets(myNweets.docs.map((doc) => doc.data()))
  }

  const onChange = (e) => {
    const { target: { value } } = e
    setNewDisplayName(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // 사용자명이 기존과 다르게 변경된 값일떄
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName })
      refreshUser()
    }
  }

  // profile 컴포넌트가 렌더링된 이후 실행될 함수
  useEffect(() => {
    getMyNweets()
  }, [])

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className="profile-form">
        <input type="text" value={newDisplayName} onChange={onChange} placeholder="사용자명"
          autoFocus className='form-input' />
        <input type="submit" value="사용자명 수정" className="form-btn" style={{ marginTop: 10 }} />
      </form>
      <span className="form-btn cancel-btn" onClick={onLogOutClick}>로그아웃</span>
      <section>
        <h3 className='subtitle'>내가 쓴 글</h3>
        <div className='grid-container'>
          {
            nweets && nweets.map((nweet) => (
              <Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
              />
            ))
          }
        </div>
      </section>

    </div>
  )
}

export default Profile