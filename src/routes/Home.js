import { dbService } from 'fbase'
import { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'
import NweetFactory from 'components/NweetFactory'

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState('')

  useEffect(() => {
    // 실시간 데이터베이스 도입
    dbService
      .collection('nweet')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))
        setNweets(newArray)
      })
  }, [])

  return (
    <>
      <NweetFactory userObj={userObj} />
      <div className="grid-container">
        {nweets &&
          nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </>
  )
}

export default Home
