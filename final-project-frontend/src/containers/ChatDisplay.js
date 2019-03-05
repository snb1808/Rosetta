import React from 'react';
import ChatBar from '../components/ChatBar'

const ChatDisplay = ({ currentUser, chats, setChat, messages }) => {

    return (
        <div className='chat_bar_container'>
        {chats.map(chat => <ChatBar setChat={setChat} messages={messages} key={chat.id} chat={chat} currentUser={currentUser}/> )}            
        </div>
    )

}

export default ChatDisplay