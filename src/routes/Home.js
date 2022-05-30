import { dbService } from 'fbase'
import { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState('')

  useEffect(() => {
    // 실시간 데이터베이스 도입
    dbService.collection('nweet').onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        creatorId: document.creatorId,
        ...document.data()
      }))
      setNweets(newArray)
    })
  }, [])


  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('nweet').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid
    })
    setNweet('')
  }

  const onChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    setNweet(value)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
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

export default Home