import React, { Component } from 'react';
import API from '../adapters/API'

class Messages extends Component {

    render() {
        const messagesToRender = this.props.messages.filter(message => message.chat_id === this.props.currentChat.id)

        return (
            <ul>
                {messagesToRender.map(message => 
                message.user_id === this.props.currentUser.id 
                ?
                <li className='sender_message message' key={message.id}>
                {message.original_content}
                </li>
                :
                <li className='receiver_message message' key={message.id}>
                {message.translated_content}
                </li>
                )}
            </ul>
        )
    }

}

export default Messages