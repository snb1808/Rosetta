import React, { Component } from 'react';
import API from '../adapters/API'

class GroupChat extends Component {

    state = {
        contactList: [],
        selectedUsers: []
    }

    componentDidMount() {
        API.getUsers().then(data => { this.setState({ contactList: data }) })
    } 

    selectUser = user => { 
        this.state.selectedUsers.includes(user) 
        ?
        this.setState({ selectedUsers: this.state.selectedUsers.filter(person => person.id !== user.id)})
        :
        this.setState({ selectedUsers: [...this.state.selectedUsers, user] })
    }

    createChat = () => {
        const ids = this.state.selectedUsers.map(user => user.id)
        console.log(ids)
        API.createChat(ids)
        .then(data => this.props.setChat(data))
        this.props.closeNewChat()
    }


    render() {
    return (
        <div className='chat_bar_container'>
                {this.state.contactList.map(user => <div className={`${this.state.selectedUsers.includes(user) ? 'selected' : null } chat_bar`} onClick={() => this.selectUser(user)} key={user.id}>{user.first_name} {user.last_name}</div>)}
                <button onClick={this.createChat}>Create Chat</button>
        </div>
    )
    }

}

export default GroupChat