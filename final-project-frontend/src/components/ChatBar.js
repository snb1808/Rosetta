import React, { Component } from 'react';
import API from "../adapters/API";

class ChatBar extends Component {

    state = {
        recipient: {}
    }

    componentDidMount() {
        API.getUser(this.props.chat.recipient).then(data => this.setState({ recipient: data }))
    }

    render() {
        return (
            <div className='chat_bar' onClick={() => this.props.setChat(this.props.chat)}>{this.state.recipient.first_name} {this.state.recipient.last_name}</div>
        )
    }

}

export default ChatBar