import { dbService } from "fbase"
import { useState } from 'react'

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await dbService.doc(`nweet/${nweetObj.id}`).delete()
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
    <div>
      {
        editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={newNweet} required />
              <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>취소</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </>
        )
      }

    </div>
  )
}

export default Nweet