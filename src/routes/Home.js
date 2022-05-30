import { dbService, storageService } from 'fbase'
import { useEffect, useState } from 'react'
import Nweet from 'components/Nweet'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState('')
  const [attachment, setAttachment] = useState('')

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
    let attachmentUrl = ''
    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const response = await attachmentRef.putString(attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }

    await dbService.collection('nweet').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    })
    setNweet('')
    setAttachment('')
  }

  const onChange = (e) => {
    e.preventDefault()
    const { value } = e.target

    setNweet(value)
  }

  const onFileChange = (e) => {
    const { target: { files } } = e
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => setAttachment('')

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
        <input type="file" accept='image/*' onChange={onFileChange} />
        <input type="submit" value="글쓰기" />
        {attachment && (
          <div>
            <img
              src={attachment}
              width="300px"
              alt="파일"
            />
            <button onClick={onClearAttachment}>파일 삭제</button>
          </div>
        )
        }
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