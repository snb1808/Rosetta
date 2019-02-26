import React, { Component } from 'react';
import EditPictureForm from './EditPictureForm';
import API from '../adapters/API'
import EditLanguageSelect from '../components/EditLanguageSelect'

class Settings extends Component {

    state = {
        editPicture: false,
        editLanguage: false,
        profilePicture: ''
    }

    async componentDidMount() {
        await this.setState({ profilePicture: this.props.currentUser.profile_picture })
    }

    handleEditPicture = event => {
        event.preventDefault()
        const picture = { profile_picture: event.target.url.value }
        API.patchUser(this.props.currentUser.id, picture)
        this.setState({ profilePicture: event.target.url.value })
    }

    handleEditLanguage = event => {
        event.preventDefault()
        const language = { language_id: event.target.language.value }
        API.patchUser(this.props.currentUser.id, language)
        // this.props.history.push('/home')
        window.location.reload();
    }

    togglePictureForm = () => this.setState({ editPicture: !this.state.editPicture })

    toggleLanguageSelect = () => this.setState({ editLanguage: !this.state.editLanguage })

    render() {
        return (
            <div>     
                <button onClick={this.togglePictureForm}>Change Profile Picture</button>
                    {this.state.editPicture
                    ?
                    <EditPictureForm handleEditPicture={this.handleEditPicture} />
                    :
                    null
                    }
                <button onClick={this.toggleLanguageSelect}>Edit Language</button>
                    {this.state.editLanguage
                    ?
                    <EditLanguageSelect handleEditLanguage={this.handleEditLanguage} allLanguages={this.props.allLanguages} />
                    :
                    null
                    }
            </div>
        )
    }

}

export default Settings