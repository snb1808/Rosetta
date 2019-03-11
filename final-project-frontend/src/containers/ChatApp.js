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
        allUsers: [],
        filteredChats: [],
        newChat: false,
        userFlag: '',
        recipientFlag: '',
        showRecipientProfile: false,
        startGroupChat: false,
        isGroupChat: false,
        search: '',
        allRecipients: [],
        chatMessages: []
    }

    async componentDidMount() {
        this.renderMessages()
        await this.getChats()
        this.setState({ userFlag: this.props.allLanguages.filter(lang => lang.id === this.props.currentUser.language_id)[0].flag})
        API.getUsers().then(data => this.setState({ allUsers: data}))
    }

    getChats = () => {
        API.getChats().then(data => this.setState({ 
            allChats: data,
            filteredChats: data
        }))
    }

    addaRecipient = (recipient) => {
        if (!this.state.allRecipients.map(i => i.id).includes(recipient.id)) {
        this.setState({allRecipients: [...this.state.allRecipients, recipient]})
        }
    }

    renderMessages = async () => {
        await API.getMessages().then(data => {
            this.setState({ 
                messages: data,
                chatMessages: this.state.messages.filter(message => message.chat_id === this.state.currentChat.id)
            })
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        if (event.target.content.value.replace(/\s+/g, '') !== '') {
            const message = {
                original_content: event.target.content.value,
                chat_id: this.state.currentChat.id
            }
            API.postMessage(message)
            .then(this.renderMessages())
            API.patchRead({
                chat_id: this.state.currentChat.id,
                read: false
            })
            event.target.content.value = ''
        }
    }

    getFullName(user) {
        return `${user.first_name} ${user.last_name}`.toLowerCase()
    }

    handleSearch = e => {
        e.preventDefault()
        if (e.target.value === '') {
            this.setState({ filteredChats: this.state.allChats })
        } else {
        this.setState({ filteredChats: [] })
        const users = this.state.allRecipients.filter(user => this.getFullName(user).includes(e.target.value.toLowerCase()))
        const array = []
        users.forEach(user => {
            this.state.allChats.filter(chat => {
                if(chat.recipient.includes(user.id)) {
                    array.push(chat)
                }
            })
        })
        this.setState({filteredChats: array})
    }
    }

    setChat = (chat) => {
        this.setState({ 
            currentChat: chat,
            showRecipientProfile: false,
            recipient: [],
            isGroupChat: false,
            chatMessages: this.state.messages.filter(message => message.chat_id === chat.id)
         })
        API.getChats().then(data => this.setState({ 
            allChats: data,
            filteredChats: data
        }))
            if (chat.recipient.length === 1) {
                const user = this.state.allUsers.find(user => user.id === chat.recipient[0])
                this.setState({ 
                    recipientFlag: this.props.allLanguages.filter(lang => lang.id === user.language_id)[0].flag,
                    recipient: [user]                  
            })
        } else {
            const users = chat.recipient.map(num => this.state.allUsers.find(user => user.id === num))
            this.setState({ 
                isGroupChat: true,
                recipientFlag: '',
                recipient: users
            })
        }   
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
                            <input name='search' placeholder='Search' onChange={this.handleSearch} />
                        </form>
                        <ChatDisplay 
                        addaRecipient={this.addaRecipient} 
                        chats={this.state.filteredChats} 
                        setChat={this.setChat} 
                        messages={this.state.messages} 
                        currentUser={this.props.currentUser} 
                        />
                    </div>
                        <Chat 
                        getChats={this.getChats} 
                        allLanguages={this.props.allLanguages}
                        isGroupChat={this.state.isGroupChat} 
                        toggleProfile={this.toggleProfile} 
                        showProfile={this.state.showRecipientProfile} 
                        currentChat={this.state.currentChat} 
                        handleSubmit={this.handleSubmit} 
                        recipientFlag={this.state.recipientFlag} 
                        renderMessages={this.renderMessages} 
                        messages={this.state.chatMessages} 
                        currentUser={this.props.currentUser} 
                        recipient={this.state.recipient}
                        />
                    </div>
                }
                </div>   
                </div>

      )
    }

}

export default ChatApp;