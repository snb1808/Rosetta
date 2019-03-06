import React, { Component } from 'react';
import Chat from './Chat';
import API from '../adapters/API';
import ChatDisplay from '../containers/ChatDisplay';
import NewChat from '../components/NewChat';
import GroupChat from '../components/GroupChat'
import { Link } from 'react-router-dom';

class ChatApp extends Component {

    state = {
        currentChat: null, 
        recipient: [],
        messages: [],
        allChats: [],
        filteredChats: [],
        newChat: false,
        userFlag: '',
        recipientFlag: '',
        showRecipientProfile: false,
        startGroupChat: false,
        isGroupChat: false,
        search: ''
    }

    async componentDidMount() {
        this.renderMessages()
        await API.getChats().then(data => this.setState({ 
            allChats: data,
            filteredChats: data
     }))
        await API.getLanguages().then(data => this.setState({ userFlag: data.filter(lang => lang.id === this.props.currentUser.language_id)[0].flag}))
    }

    renderMessages = () => {
        API.getMessages().then(data => this.setState({ messages: data }))
    }

    handleSubmit = event => {
        event.preventDefault()
        if (event.target.content.value.replace(/\s+/g, '') !== '') {
            const message = {
                original_content: event.target.content.value,
                chat_id: this.state.currentChat.id
            }
            API.postMessage(message)
            API.patchRead({
                chat_id: this.state.currentChat.id,
                read: false
            })
            event.target.content.value = ''
            this.setState({ messages: [...this.state.messages, message] })
        }
    }

    getFullName(user) {
        return `${user.first_name} ${user.last_name}`
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const filtered = this.state.allChats.map(chat => {
            let chatUsers = []
            chat.recipient.map(async id => await API.getUser(id).then(user => chatUsers.push(user)))
            console.log(chatUsers)

            chatUsers.forEach(user => {
                if (this.getFullName(user).includes(this.state.search)) {
                    return chat
                }
            })
        })
        this.setState({filteredChats: filtered})
    }

    setChat = (chat) => {
        this.setState({ 
            currentChat: chat,
            showRecipientProfile: false,
            recipient: [],
            isGroupChat: false
         })
        API.getChats().then(data => this.setState({ 
            allChats: data,
            filteredChats: data
        }))
        chat.recipient.map(id => {
        API.getUser(id).then(user => {
            this.setState({ recipient: [...this.state.recipient, user] })
            chat.recipient.length === 1
            ?
            API.getLanguages().then(data => this.setState({ 
                recipientFlag: data.filter(lang => lang.id === user.language_id)[0].flag,
            }))
            :
            this.setState({ 
                isGroupChat: true,
                recipientFlag: ''
             })
        })
        })
        API.patchRead({
            chat_id: chat.id,
            read: true
        })
    }

    setNewChat = () => { this.setState({ newChat: !this.state.newChat }) }

    toggleProfile = () => { this.setState({ showRecipientProfile: !this.state.showRecipientProfile })}

    toggleStartGroupChat = () => { this.setState({ startGroupChat: !this.state.startGroupChat })}

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
                    <button className='group-chat-button' onClick={this.toggleStartGroupChat}>Start Group Chat</button>
                    {this.state.startGroupChat
                    ?
                    <GroupChat currentUser={this.props.currentUser} setChat={this.setChat} closeNewChat={this.setNewChat} />
                    :
                    <NewChat currentUser={this.props.currentUser} setChat={this.setChat} closeNewChat={this.setNewChat} />
                    }
                </div>
                :
                <div className='chat_app'>
                    <div className='all_chats_container left_column'>
                        <button className='new_chat_btn' onClick={this.setNewChat}>Start New Chat</button>
                        <form className='search_bar'>
                            <input name='search' value={this.state.search} placeholder='Search' onChange={this.handleSearch} />
                        </form>
                        <ChatDisplay chats={this.state.filteredChats} setChat={this.setChat} messages={this.state.messages} currentUser={this.props.currentUser} />
                    </div>
                        <Chat isGroupChat={this.state.isGroupChat} toggleProfile={this.toggleProfile} showProfile={this.state.showRecipientProfile} currentChat={this.state.currentChat} handleSubmit={this.handleSubmit} recipientFlag={this.state.recipientFlag} renderMessages={this.renderMessages} messages={this.state.messages} currentUser={this.props.currentUser} recipient={this.state.recipient}/>
                    </div>
                }
                </div>   
                </div>

      )
    }

}

export default ChatApp;