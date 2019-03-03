import React, { Component } from 'react';
import API from "../adapters/API";

class ChatBar extends Component {

    state = {
        recipient: []
    }

    componentDidMount() {
        this.props.chat.recipient.map(async id => { 
            await API.getUser(id)
            .then(data => this.setState({ recipient: [...this.state.recipient, data] }))
        })
    }

    getNames() {
        const namesArray = this.state.recipient.map(user => user.first_name)
        return namesArray.join(', ')
    }

    render() {
        if(this.state.recipient.length === 1) {
            return (
                <div className='chat_bar' onClick={() => this.props.setChat(this.props.chat)}>
                <div className='chat_bar_photo_holder'>
                    <img className='chat_bar_photo' src={this.state.recipient[0].profile_picture} alt=''/>
                </div>
                    <p className='chat_bar_username'>
                    {this.state.recipient[0].first_name} {this.state.recipient[0].last_name}
                    </p>
                </div>
            )} else {
                return (
                <div className='chat_bar' onClick={() => this.props.setChat(this.props.chat)}>
                    {this.getNames()}
                </div>
                )}
    }

}

export default ChatBar