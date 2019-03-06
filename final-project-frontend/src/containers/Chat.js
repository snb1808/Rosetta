import React, { Component } from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';

 
class Chat extends Component {

    render() {
        if (!this.props.showProfile) {
            return (
                <div className={`${this.props.currentChat ? 'chat_container' : 'chat_container hidden'}`}>
                    {this.props.currentChat &&
                    <Messages isGroupChat={this.props.isGroupChat} toggleRecipientProfile={this.props.toggleProfile} scrollToBottom={this.scrollToBottom} flag={this.props.recipientFlag} renderMessages={this.props.renderMessages} currentChat={this.props.currentChat} messages={this.props.messages} currentUser={this.props.currentUser} recipient={this.props.recipient}/> }
                    <MessageInput handleSubmit={this.props.handleSubmit} />
                </div>
        )} else if (!this.props.isGroupChat) {
            return (
                <div className={`${this.props.currentChat ? 'chat_container' : 'chat_container hidden'} recipient_profile`}>
                    <div className='recipient_image_holder'>
                        <i className="fas fa-arrow-left" onClick={this.props.toggleProfile}/>
                        <img src={this.props.recipient[0].profile_picture} alt='' />
                    </div>
                    <div className='recipient_info_holder'>
                        <h2>{this.props.recipient[0].first_name} {this.props.recipient[0].last_name}</h2>
                        <p>{this.props.recipient[0].email}</p>
                    </div>
                </div>
        )} else {
            return (
                <div className={`${this.props.currentChat ? 'chat_container' : 'chat_container hidden'} recipient_profile`}>
                    <i className="fas fa-arrow-left" onClick={this.props.toggleProfile}/>
                    <h2>Chat Participants:</h2>
                    {this.props.recipient.map(user => {
                        return <div>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                        </div>
                    })}
                </div>
            )}
    }

}

export default Chat