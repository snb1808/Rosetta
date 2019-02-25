import React from 'react';
import ChatBar from '../components/ChatBar'

const ChatDisplay = (props) => {

    return (
        <div>
        {props.chats.map(chat => <ChatBar setChat={props.setChat} key={chat.id} chat={chat} /> )}            
        </div>
    )

}

export default ChatDisplay