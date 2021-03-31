import { useRef } from 'react'
import { useHistory } from 'react-router';
import './JoinOrCreate.css'

function JoinOrCreateRoom() {
  const inputRef = useRef<HTMLInputElement>(null);
  let history = useHistory();

  const handleCreate = () => {
    let newId = Math.floor(Math.random() * 600000)
    history.push(`/bubbles/${newId}`)
  }

  const handleJoin = () => {
    if (inputRef.current) {
      console.log(`inputRef.current`, inputRef.current.value)
      if (inputRef.current.value === '') return
      history.push(`/bubbles/${inputRef.current.value}`)
    }
  }

  return (
    <div className='bubbleFrom'>
      <div className='cardForm'>
        <button onClick={handleCreate}>Create new Room</button>
        <input type='text' placeholder='Room ID' ref={inputRef} />
        <button onClick={handleJoin}>Join Room</button>
      </div>
    </div>
  )
}

export default JoinOrCreateRoom
