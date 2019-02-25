import React, { Component } from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import API from '../adapters/API';
import ChatDisplay from '../containers/ChatDisplay'

class ChatApp extends Component {

    state = {
        currentChat: {}, 
        messages: [],
        allChats: []
    }

    componentDidMount() {
        API.getChat(1).then(data =>  {this.setState({ currentChat: data })})
        API.getMessages().then(data => this.setState({ messages: data }))
        API.getChats().then(data => this.setState({ allChats: data }))
    }

    handleSubmit = event => {
        event.preventDefault()
        const message = {
            original_content: event.target.content.value,
            user_id: this.props.currentUser.id,
            chat_id: this.state.currentChat.id
        }
        API.postMessage(message)
        event.target.content.value = ''
        this.setState({ messages: [...this.state.messages, message] })
    }

    setChat(chat) {
        this.setState({ currentChat: chat })
    }

    createChat() {
        API.createChat()
    }

    render() {
        return (
            <div>
                <button onClick={this.props.handleLogOut}>Log Out</button>
                <img src={this.props.currentUser.profile_picture} alt='' />
                <div className='all_chats_container'>
                    <button onClick={this.createChat}>Start New Chat</button>
                    <ChatDisplay chats={this.state.allChats} setChat={() => this.setChat} />
                </div>
                <div className='chat_container'>
                    <h3>Rosetta Chat</h3>
                    <Messages chat={this.state.currentChat} messages={this.state.messages} currentUser={this.props.currentUser} />
                    <MessageInput handleSubmit={this.handleSubmit} />
                </div>
            </div>
      )
    }

}

export default ChatApp;