import React, { Component } from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import API from '../adapters/API';
import ChatDisplay from '../containers/ChatDisplay'
import StartNewChat from '../containers/StartNewChat'

class ChatApp extends Component {

    state = {
        currentChat: {}, 
        messages: [],
        allChats: [],
        newChat: false,
        userFlag: ''
    }

    async componentDidMount() {
        await API.getMessages().then(data => this.setState({ messages: data }))
        await API.getChats().then(data => this.setState({ allChats: data }))
        await API.getLanguages().then(data => console.log(data))
            // this.setState({ userFlag: data.filter(lang => lang.id === this.props.currentUser.language_id).flag}))
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

    setChat = (chat) => {
        this.setState({ currentChat: chat })
        API.getChats().then(data => this.setState({ allChats: data }))
    }

    setNewChat = () => {
        this.setState({ newChat: !this.state.newChat })
    }

    getFlag() {
        
    }

    render() {
        return (
            <div>
                <button className='logout' onClick={this.props.handleLogOut}>Log Out</button>
                <img className='profile_picture' src={this.props.currentUser.profile_picture} alt='' />
                <p className='user_name'>{this.props.currentUser.first_name} {this.state.userFlag}</p>
                <h1 className='title'>Rosetta Chat</h1>
                {this.state.newChat
                ?
                <div className='left_column '>
                    <i className="fas fa-arrow-left button" onClick={this.setNewChat}></i> New Chat
                    <StartNewChat currentUser={this.props.currentUser} setChat={this.setChat} />
                </div>
                :
                <div className='all_chats_container left_column'>
                    <button onClick={this.setNewChat}>Start New Chat</button>
                    <ChatDisplay chats={this.state.allChats} setChat={this.setChat} />
                </div>
                }
                <div className='chat_container'>
                    {this.state.messages && <Messages currentChat={this.state.currentChat} messages={this.state.messages} currentUser={this.props.currentUser} /> }
                    <MessageInput handleSubmit={this.handleSubmit} />
                </div>
            </div>
      )
    }

}

export default ChatApp;