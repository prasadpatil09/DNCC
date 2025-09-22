import React, { useState } from 'react'
import './chat.css'

const Inputchat = ({ addmessage }) => {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message.trim() === "") return // prevent empty messages
    addmessage(message)
    setMessage("") // clear input
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="input_container">
      <textarea
        name="message"
        id="message"
        rows="2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Inputchat
