import { dbService, storageService } from 'fbase'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [attachment, setAttachment] = useState('')

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
  )
}

export default NweetFactory