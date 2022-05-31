import { dbService, storageService } from 'fbase'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [attachment, setAttachment] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nweet === '') {
      return
    }

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
    // 파일이 있을 때만 파일 읽기
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile)
    }
  }

  const onClearAttachment = () => setAttachment('')


  return (
    <form onSubmit={onSubmit} className="factory-form">
      <div className="factory-input__container">
        <input
          type="text"
          className="factory-input__input"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className='factory-input__arrow' />
      </div>
      <label htmlFor="attach-file" className='factory-input__label'>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input id="attach-file" type="file" accept='image/*' onChange={onFileChange} style={{ opacity: 0 }} />

      {attachment && (
        <div className="factory-form__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="첨부 이미지"
          />
          <div className="factory-form__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  )
}

export default NweetFactory