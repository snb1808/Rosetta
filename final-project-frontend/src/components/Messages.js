import React, { Component } from 'react';
import API from '../adapters/API';

class Messages extends Component {

    state = {
        names: '',
        allTranslations: [],
        allUsers: []
    }

    async componentDidMount() {
        this.interval = setInterval(async () => {
            this.props.renderMessages()
        }, 1000)
        // this.props.scrollToBottom()
       await API.getTranslations().then(allTranslations => this.setState({allTranslations}))
       await API.getUsers().then(allUsers=> this.setState({allUsers}))
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getUser(id) {
        console.log(this.state.allUsers)
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
                <div className='chat_header'> 
                    <div className='profile_pic_container'>
                        <img className='profile_picture' onClick={this.props.toggleRecipientProfile} src={this.props.recipient.profile_picture} alt='' />
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
                        {test && <p className={"message"}> {this.props.isGroupChat && this.getUser(message.user_id).first_name} {test.content} </p>}
                        </li>
                        )})}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Messages