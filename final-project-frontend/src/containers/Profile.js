import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Settings from '../components/Settings'

class Profile extends Component {

    state = {
        showSettings: false
    }

    toggleSettings = () => this.setState({ showSettings: !this.state.showSettings })

    render() {
        return (
            <div className='home profile'>
            <div className='profile_column'>
                <Link to='/home'><i className="fas fa-arrow-left"/></Link>
                <h1>Profile</h1>
                <h2>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h2>
                <img className='full_profile_picture' src={this.props.currentUser.profile_picture} alt='' />
                </div>
                <div className='settings_column'>
                    <i className="fas fa-cog" onClick={this.toggleSettings}><h2>Settings</h2></i>
                        {this.state.showSettings
                        ?
                        <Settings currentUser={this.props.currentUser} updateCurrentUser={this.props.updateCurrentUser} allLanguages={this.props.allLanguages} history={this.props.history} />
                        :
                        null
                        }
                </div>
            </div>
        )
    }

}

export default Profile