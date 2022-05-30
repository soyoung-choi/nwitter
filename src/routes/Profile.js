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
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={newDisplayName} onChange={onChange} placeholder="사용자명" />
        <input type="submit" value="프로필 수정" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
      <div>
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

    </>
  )
}

export default Profile