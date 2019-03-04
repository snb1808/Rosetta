import React, { Component } from 'react';
import API from '../adapters/API';

class Messages extends Component {

    messagesEnd = null

    setMessagesEnd = element => this.messagesEnd = element

    state = {
        names: '',
        allTranslations: [],
        allUsers: []
    }

    async componentDidMount() { 
        this.interval = setInterval(() => {
            this.props.renderMessages()
        }, 1000)
        this.scrollToBottom()
       await API.getTranslations().then(allTranslations => this.setState({allTranslations}))
       await API.getUsers().then(allUsers => this.setState({allUsers}))
    }
    
    scrollToBottom = () => { 
        if (this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: 'smooth' }) 
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidUpdate(prevProps) {
        if (this.props.messages.length !== prevProps.messages.length || this.props.currentChat.id !== prevProps.currentChat.id) {
        this.scrollToBottom()
        }
    }

    getUser(id) {
        return this.state.allUsers.find(user => user.id === id)
    }

    getNames = () => {
        const namesArray = this.props.recipient.map(user => user.first_name)
        return namesArray.join(', ')
    }

    getTranslation =  (id) => {
       return this.state.allTranslations.filter(message => message.message.id === id).find(message => message.user.id === this.props.currentUser.id)
    }

    render() {
        return (
            <div>
            {this.state.allUsers.length > 0 ? 
                <div>
                <div className='chat_header'> 
                    <div className='profile_pic_container'>
                    {console.log(this.props.recipient)}
                        <img className='profile_picture' onClick={this.props.toggleRecipientProfile} src={this.props.recipient[0] ? this.props.recipient[0]['profile_picture'] : null} alt='' />
                    </div>
                    {this.getNames()} {this.props.flag} 
                </div>
                <div className='message_container'>
                    <ul className='message_list'>
                        {this.props.messages.filter(message => message.chat_id === this.props.currentChat.id).map(message => {
                        const test = this.getTranslation(message.id)

                        return (message.user_id === this.props.currentUser.id 
                        ?
                        <li className='sender_message' key={message.id}>
                        <p className={"message"}>{message.original_content}</p>
                        </li>
                        :
                        <li className='receiver_message' key={message.id}>
                        {test ? <p className={"message"}> <p className='sender_name'>{this.props.isGroupChat ? this.getUser(message.user_id).first_name : null }</p> {test.content} </p> : null}
                        </li>
                        )})}
                        <div ref={this.setMessagesEnd}> </div>
                    </ul>
                </div>
                </div>
            : null }
            </div>
        )
    }

}

export default Messages