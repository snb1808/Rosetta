import React, { Component } from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import API from '../adapters/API';
import ChatDisplay from '../containers/ChatDisplay'
import StartNewChat from '../containers/StartNewChat'
import { Link } from 'react-router-dom';

class ChatApp extends Component {

    state = {
        currentChat: null, 
        recipient: {},
        messages: [],
        allChats: [],
        newChat: false,
        userFlag: '',
        recipientFlag: ''
    }

    async componentDidMount() {
        console.log('hello', this.props.currentUser.language_id)
        this.renderMessages()
        await API.getChats().then(data => this.setState({ allChats: data }))
        await API.getLanguages().then(data => this.setState({ userFlag: data.filter(lang => lang.id === this.props.currentUser.language_id)[0].flag}))
    }

    renderMessages = () => {
        API.getMessages().then(data => this.setState({ messages: data }))
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
        API.getUser(chat.recipient).then(user => {
            this.setState({ recipient: user })
            API.getLanguages().then(data => this.setState({ recipientFlag: data.filter(lang => lang.id === user.language_id)[0].flag}))
        })
    }

    setNewChat = () => {
        this.setState({ newChat: !this.state.newChat })
    }

    render() {
        return (
            <div>
                <button className='logout' onClick={this.props.handleLogOut}>Log Out</button>
                <Link to='/profile'>
                    <img className='profile_picture' src={this.props.currentUser.profile_picture} alt='' />
                    <p className='user_name'> <span className='flag'>{this.state.userFlag}</span><span>{this.props.currentUser.first_name}</span></p>
                </Link>
                {this.state.newChat
                ?
                <div className='left_column '>
                    <p><i className="fas fa-arrow-left" onClick={this.setNewChat} /> New Chat</p>
                    <StartNewChat currentUser={this.props.currentUser} setChat={this.setChat} closeNewChat={this.setNewChat} />
                </div>
                :
                <div>
                    <div className='all_chats_container left_column'>
                        <button onClick={this.setNewChat}>Start New Chat</button>
                        <ChatDisplay chats={this.state.allChats} setChat={this.setChat} />
                    </div>
                    <div className='chat_container'>
                        {this.state.currentChat && <Messages flag={this.state.recipientFlag} renderMessages={this.renderMessages} currentChat={this.state.currentChat} messages={this.state.messages} currentUser={this.props.currentUser} recipient={this.state.recipient}/> }
                        <MessageInput handleSubmit={this.handleSubmit} />
                    </div>
                </div>
                }
                
            </div>
      )
    }

}

export default ChatApp;