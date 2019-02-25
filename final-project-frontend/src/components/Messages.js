import React, { Component } from 'react';

class Messages extends Component {

    render() {
        return (
            <ul>
                {this.props.messages.map(message => 
                <li key={message.id}>
                {message.user_id === this.props.currentUser.id 
                ?
                message.original_content
                :
                message.translated_content
                }
                </li>
                )}
            </ul>
        )
    }

}

export default Messages