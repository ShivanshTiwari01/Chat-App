// App.js

import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import EmojiPicker from 'react-emoji-picker';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  // State to store messages
  const [messages, setMessages] = useState([]);

  // State to store current message
  const [currentMessage, setCurrentMessage] = useState('');

  // State to store mentions list
  const [mentions, setMentions] = useState([]);

  // State to toggle emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Function to handle sending a message
  const sendMessage = () => {
    if (currentMessage.trim() !== '') {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        text: currentMessage,
        user: randomUser,
        likes: 0
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
      setMentions([]); // Clear mentions after sending message
    }
  };

  // Function to handle liking a message
  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
  };

  // Function to handle adding emoji
  const handleAddEmoji = (emoji) => {
    setCurrentMessage(currentMessage + emoji);
  };

  // Function to handle mentions
  const handleMention = (e) => {
    const mentionIndex = e.target.value.lastIndexOf('@');
    if (mentionIndex !== -1) {
      const mentionSubstring = e.target.value.substring(mentionIndex + 1);
      const matchedUsers = user_list.filter(user => user.toLowerCase().startsWith(mentionSubstring.toLowerCase()));
      setMentions(matchedUsers);
    } else {
      setMentions([]);
    }
  };

  return (
    <div className="chat-window">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-content">
              <span className="username">{message.user}: </span>
              <span className="text">{message.text}</span>
            </div>
            <button className="like-button" onClick={() => handleLike(index)}>
              Like ({message.likes})
            </button>
          </div>
        ))}
      </div>
      {showEmojiPicker && (
        <EmojiPicker onSelect={handleAddEmoji} className="emoji-picker" />
      )}
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyUp={handleMention}
        />
        <div className="options">
          <button onClick={sendMessage}>Send</button>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        </div>
      </div>
      {mentions.length > 0 && (
        <div className="mentions-list">
          <p>Mentions:</p>
          <ul>
            {mentions.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
