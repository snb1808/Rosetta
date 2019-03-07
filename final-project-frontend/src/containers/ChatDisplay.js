import React from 'react';
import ChatBar from '../components/ChatBar'

const ChatDisplay = ({ currentUser, chats, setChat, messages, addaRecipient }) => {

    return (
        <div className='chat_bar_container'>
        {[...new Set(chats)].map(chat => <ChatBar addaRecipient={addaRecipient} setChat={setChat} messages={messages} key={chat.id} chat={chat} currentUser={currentUser}/> )}            
        </div>
    )

}

export default ChatDisplay