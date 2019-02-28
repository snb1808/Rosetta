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
            <div className='chat_bar' onClick={() => this.props.setChat(this.props.chat)}>
                <div className='chat_bar_photo_holder'> 
                    <img className='chat_bar_photo' src={this.state.recipient.profile_picture} alt=''/>
                </div>
                {this.state.recipient.first_name} {this.state.recipient.last_name}
            </div>
        )
    }

}

export default ChatBar