import React from 'react';
import ChatBar from '../components/ChatBar'

const ChatDisplay = ({ currentUser, chats, setChat }) => {

    return (
        <div className='chat_bar_container'>
        {chats.map(chat => <ChatBar setChat={setChat} key={chat.id} chat={chat} currentUser={currentUser}/> )}            
        </div>
    )

}

export default ChatDisplay