import React, { Component } from 'react';
import Chat from './Chat';
import API from '../adapters/API';
import ChatDisplay from '../containers/ChatDisplay';
import StartNewChat from '../containers/StartNewChat';
import { Link } from 'react-router-dom';

class ChatApp extends Component {

    state = {
        currentChat: null, 
        recipient: {},
        messages: [],
        allChats: [],
        newChat: false,
        userFlag: '',
        recipientFlag: '',
        showRecipientProfile: false
    }

    async componentDidMount() {
        this.renderMessages()
        await API.getChats().then(data => this.setState({ allChats: data }))
        await API.getLanguages().then(data => this.setState({ userFlag: data.filter(lang => lang.id === this.props.currentUser.language_id)[0].flag}))
        // this.scrollToBottom()
    }

    renderMessages = () => {
        API.getMessages().then(data => this.setState({ messages: data }))
    }

    // scrollToBottom = () => {
    //     this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    //   }
      
    //   componentDidUpdate() {
    //     this.scrollToBottom()
    //   }

    //   messagesEnd = React.createRef()

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
        this.setState({ 
            currentChat: chat,
            showRecipientProfile: false
         })
        API.getChats().then(data => this.setState({ allChats: data }))
        API.getUser(chat.recipient).then(user => {
            this.setState({ recipient: user })
            API.getLanguages().then(data => this.setState({ recipientFlag: data.filter(lang => lang.id === user.language_id)[0].flag}))
        })
    }

    setNewChat = () => { this.setState({ newChat: !this.state.newChat }) }

    toggleProfile = () => { this.setState({ showRecipientProfile: !this.state.showRecipientProfile })}

    render() {
        return (
            <div className='home'>
                <div className='header'>
                    <Link to='/profile'>
                    <div className='profile_div'>
                        <div className='profile_pic_container'>
                            <img className='profile_picture' src={this.props.currentUser.profile_picture} alt='' />
                        </div>
                        <p className='user_name'> <span className='flag'>{this.state.userFlag}</span><span>{this.props.currentUser.first_name}</span></p>
                    </div>
                    </Link> 
                    <p className='title'>Rosetta</p>   
                <div>
                     <button className='logout' onClick={this.props.handleLogOut}>Log Out</button>
                </div>
                </div>   
                <div className='chat_app_container'>   
                {this.state.newChat
                ?
                <div className='left_column '>
                    <p><i className="fas fa-arrow-left" onClick={this.setNewChat} /> New Chat</p>
                    <StartNewChat currentUser={this.props.currentUser} setChat={this.setChat} closeNewChat={this.setNewChat} />
                </div>
                :
                <div className='chat_app'>
                    <div className='all_chats_container left_column'>
                        <button className='new_chat_btn' onClick={this.setNewChat}>Start New Chat</button>
                        <ChatDisplay chats={this.state.allChats} setChat={this.setChat} />
                    </div>
                        <Chat toggleProfile={this.toggleProfile} showProfile={this.state.showRecipientProfile} currentChat={this.state.currentChat} handleSubmit={this.handleSubmit} recipientFlag={this.state.recipientFlag} renderMessages={this.renderMessages} messages={this.state.messages} currentUser={this.props.currentUser} recipient={this.state.recipient}/>
                    </div>
                }
                </div>   
                </div>

      )
    }

}

export default ChatApp;