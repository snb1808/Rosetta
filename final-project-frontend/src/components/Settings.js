import React, { Component } from 'react';
import EditPictureForm from './EditPictureForm';
import API from '../adapters/API'
import EditLanguageSelect from '../components/EditLanguageSelect'
import EditPersonal from '../components/EditPersonal'

class Settings extends Component {

    state = {
        // editPicture: false,
        // editLanguage: false,
        profilePicture: '',
        // editPersonal: false,
        editForm: ''
    }

    async componentDidMount() {
        await this.setState({ profilePicture: this.props.currentUser.profile_picture })
    }

    handleEditPicture = event => {
        event.preventDefault()
        const picture = { profile_picture: event.target.url.value }
        API.patchUser(this.props.currentUser.id, picture)
        this.props.updateCurrentUser()
        this.setState({ profilePicture: event.target.url.value })
    }

    handleEditLanguage = event => {
        event.preventDefault()
        const language = { language_id: event.target.language.value }
        API.patchUser(this.props.currentUser.id, language)
        this.props.updateCurrentUser()
        this.setState({ editLanguage: false })
    }

    handleEditPersonal = event => {
        event.preventDefault() 
        let firstName
        let lastName
        let newEmail
        event.target.first_name.value ? firstName = event.target.first_name.value : firstName = this.props.currentUser.first_name
        event.target.last_name.value ? lastName = event.target.last_name.value : lastName = this.props.currentUser.last_name
        event.target.email.value ? newEmail = event.target.email.value : newEmail = this.props.currentUser.email
        const details = {
            first_name: firstName,
            last_name: lastName,
            email: newEmail
        }
        API.patchUser(this.props.currentUser.id, details)
        this.props.updateCurrentUser()
        this.setState({ editPersonal: false })
    }

    togglePictureForm = () => this.state.editForm === 'picture' ? this.setState({ editForm: ''}) : this.setState({ editForm: 'picture' }) 

    toggleLanguageSelect = () => this.state.editForm === 'language' ? this.setState({ editForm: ''}) : this.setState({ editForm: 'language' }) 

    toggleEditPersonal = () => this.state.editForm === 'personal' ? this.setState({ editForm: ''}) : this.setState({ editForm: 'personal' }) 

    renderEditForm = () => {
        switch (this.state.editForm) {
            case 'picture':
                return <EditPictureForm handleEditPicture={this.handleEditPicture} />
            case 'language':
                return <EditLanguageSelect handleEditLanguage={this.handleEditLanguage} allLanguages={this.props.allLanguages} />
            case 'personal':
                return <EditPersonal handleEditPersonal={this.handleEditPersonal} currentUser={this.props.currentUser} />
            default: return null
        }
    }

    render() {
        return (
            <div className='edit_content'>     
                <button onClick={this.togglePictureForm}>Change Profile Picture</button>
                  
                <button onClick={this.toggleLanguageSelect}>Edit Language</button>
                  
                <button onClick={this.toggleEditPersonal}>Edit Personal Details</button>
                
                <div>
                    {this.renderEditForm()}
                </div>

            </div>
        )
    }

}

export default Settings