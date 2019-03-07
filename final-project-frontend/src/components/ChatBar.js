import React, { Component } from 'react';
import API from "../adapters/API";

class ChatBar extends Component {

    state = {
        recipient: [],
        lastMessage: {},
        read: true
    }

    componentDidMount() {
        this.props.chat.recipient.map(async id => { 
            await API.getUser(id)
            .then(data => {
                this.props.addaRecipient(data)
                this.setState({ recipient: [...this.state.recipient, data] })
            })
        })
        API.getLastMessage({chat_id: this.props.chat.id}).then(lastMessage => this.setState({lastMessage}))
        API.getUserChat({ chat_id: this.props.chat.id }).then(userChat => this.setState({ read: userChat[0].read }))
    }

    componentDidUpdate(prevProps) {
        if(this.props.messages.length !== prevProps.messages.length) {
            API.getUserChat({ chat_id: this.props.chat.id }).then(userChat => this.setState({ read: userChat[0].read }))
        }
    }

    getNames() {
        const namesArray = this.state.recipient.map(user => user.first_name)
        return namesArray.join(', ')
    }

    setRead = () => { this.setState({ read: true }) }

    render() {
        // console.log(this.state.recipient)
        if(this.state.recipient.length === 1) {
            return (
                <div className={ `${this.state.read ? 'chat_bar' : 'unread chat_bar'}` } onClick={() => {
                                                                                                        this.props.setChat(this.props.chat) 
                                                                                                        this.setRead()
                                                                                                        }}>
                <div className='chat_bar_photo_holder'>
                    <img className='chat_bar_photo' src={this.state.recipient[0].profile_picture} alt=''/>
                </div>
                    <p className='chat_bar_username'>
                    {this.state.recipient[0].first_name} {this.state.recipient[0].last_name}
                    </p>
                </div>
            )} else {
                return (
                <div className={ `${this.state.read ? 'chat_bar' : 'unread chat_bar'}` } onClick={() => {
                    this.props.setChat(this.props.chat)
                    this.setRead()
                }}>
                    {this.getNames()}
                </div>
                )}
    }

}

export default ChatBar