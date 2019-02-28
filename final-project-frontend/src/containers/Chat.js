import React, { Component } from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';

 
class Chat extends Component {

    render() {
        if (!this.props.showProfile) {
            return (
                <div className={`${this.props.currentChat ? 'chat_container' : 'chat_container hidden'}`}>
                    {this.props.currentChat &&
                    <Messages toggleRecipientProfile={this.props.toggleProfile} scrollToBottom={this.scrollToBottom} flag={this.props.recipientFlag} renderMessages={this.props.renderMessages} currentChat={this.props.currentChat} messages={this.props.messages} currentUser={this.props.currentUser} recipient={this.props.recipient}/> }
                    {/* <div className='scroll_bottom' style={{ float:"left", clear: "both" }} ref={this.messagesEnd} /> */}
                    <MessageInput handleSubmit={this.props.handleSubmit} />
                </div>
        )} else {
            return (
                <div className={`${this.props.currentChat ? 'chat_container' : 'chat_container hidden'} recipient_profile`}>
                    <i className="fas fa-arrow-left" onClick={this.props.toggleProfile}/>
                    <img className='profile_picture' src={this.props.recipient.profile_picture} alt='' />
                    <h2>{this.props.recipient.first_name} {this.props.recipient.last_name}</h2>
                    <p>{this.props.recipient.email}</p>
                </div>
        )}
    }

}

export default Chat