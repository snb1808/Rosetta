import React, { Component } from 'react';
import API from '../adapters/API';

class NewChat extends Component {

    state = {
        contactList: []
    }

    componentDidMount() {
        API.getContactList().then(data => {
            this.setState({ 
                contactList: data.users
            })
        })
    } 

    createChat(user) {
        API.createChat(this.props.currentUser.id, user.id)
        .then(data => this.props.setChat(data))
        API.getContactList().then(data => {
            this.setState({ 
                contactList: data.users
            })
        })
        this.props.closeNewChat()
    }

    render() {
        return (
            <div className='chat_bar_container'>
                {this.state.contactList.map(user => <div className='chat_bar' onClick={() => this.createChat(user)} key={user.id}>{user.first_name} {user.last_name}</div>)}
            </div>
        )
    }

}

export default NewChat