import { dbService, storageService } from "fbase"
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      // 글 삭제
      await dbService.doc(`nweet/${nweetObj.id}`).delete()
      if (nweetObj.attachmentUrl !== '') {
        // 이미지 삭제
        await storageService.refFromURL(nweetObj.attachmentUrl).delete()
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)
  const onChange = (e) => {
    const { target: { value } } = e
    setNewNweet(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await dbService.doc(`nweet/${nweetObj.id}`).update({
      text: newNweet
    })
    setEditing(false)
  }

  return (
    <div className="nweet">
      {
        editing ? (
          <>
            <form onSubmit={onSubmit} className="container nweet-edit">
              <input
                onChange={onChange}
                value={newNweet}
                required
                placeholder="Edit your nweet"
                autoFocus
                className="form-input"
              />
              <input type="submit" value="Update Nweet" className="form-btn" />
            </form>
            <button onClick={toggleEditing} className="form-btn cancel-btn">취소</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl &&
              <img src={nweetObj.attachmentUrl} width="200" alt="트윗 이미지" />
            }
            {isOwner && (
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )
      }

    </div>
  )
}

export default Nweet