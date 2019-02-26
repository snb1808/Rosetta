import React, { Component } from 'react';

class Messages extends Component {

    componentDidMount() {
        this.interval = setInterval(async () => {
            this.props.renderMessages()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

        render() {
            return (
                <div>
                    <h2> {this.props.recipient.first_name} {this.props.flag} </h2>
                    <ul className='message_list'>
                        {this.props.messages.filter(message => message.chat_id === this.props.currentChat.id).map(message => 
                        message.user_id === this.props.currentUser.id 
                        ?
                        <li className='sender_message' key={message.id}>
                        <p className={"message"}>{message.original_content}</p>
                        </li>
                        :
                        <li className='receiver_message' key={message.id}>
                        <p className={"message"}>{message.translated_content}</p>
                        </li>
                        )}
                    </ul>
                </div>
            )
                    }

}

export default Messages