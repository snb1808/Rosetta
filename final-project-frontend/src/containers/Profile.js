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
            <div>
                <Link to='/home'><i className="fas fa-arrow-left"/></Link>
                <h1>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1>
                <img className='full_profile_picture' src={this.props.currentUser.profile_picture} alt='' />
                <i class="fas fa-cog" onClick={this.toggleSettings}>Settings</i>
                    {this.state.showSettings
                    ?
                    <Settings currentUser={this.props.currentUser} allLanguages={this.props.allLanguages} history={this.props.history} />
                    :
                    null
                    }
            </div>
        )
    }

}

export default Profile