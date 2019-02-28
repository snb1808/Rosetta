import React, { Component } from 'react';

class Messages extends Component {

    componentDidMount() {
        this.interval = setInterval(async () => {
            this.props.renderMessages()
        }, 1000)
        // this.props.scrollToBottom()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

        render() {
            return (
                <div>
                    <div className='chat_header'> <div className='profile_pic_container'><img className='profile_picture' onClick={this.props.toggleRecipientProfile} src={this.props.recipient.profile_picture} alt='' /></div>{this.props.recipient.first_name} {this.props.flag} </div>
                    <div className='message_container'>
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
                </div>
            )
                    }

}

export default Messages