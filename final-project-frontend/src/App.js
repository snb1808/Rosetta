import React, { Component } from 'react'; 
import './App.css';
import ChatApp from './containers/ChatApp'
import API from './adapters/API'
import { withRouter, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Profile from './containers/Profile'

class App extends Component {
 
  state = {
    currentUser: {},
    allLanguages: []
  }

  componentDidMount() {
    if (localStorage.token) {
      API.getCurrentUser().then(data => {
        this.setState({ currentUser: data.user })
      })
      API.getLanguages().then(data => this.setState({ allLanguages: data }))
      this.props.history.push('/home')
    } else {
      this.props.history.push('/login')
    }
  }

  handleLogin = event => {
    event.preventDefault()
    const currentUser = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    API.login(currentUser)
    .then(data => this.login(data))
    event.target.email.value = ''
    event.target.password.value = ''
  }

  login = data => {
    localStorage.setItem('token', data.jwt)
    this.setState({ currentUser: data.user })
  }

  handleSignUp = event => {
    event.preventDefault()
    const newUser = {
      first_name: event.target.firstName.value,
      last_name: event.target.lastName.value,
      email: event.target.email.value,
      profile_picture: event.target.profilePicture.value,
      language_id: event.target.language.value,
      password: event.target.password.value
    }
    this.createUser(newUser)
    event.target.firstName.value = ''
    event.target.lastName.value = ''
    event.target.email.value = ''
    event.target.profilePicture.value = ''
    event.target.password.value = ''
  }

  createUser = newUser => {
    API.createUser(newUser)
      .then(data => this.login(data))
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({ currentUser: {} })
  }

  render() {
    return (
      <div>
        <h1 className='title'>Rosetta</h1>
        <Route path='/login' component={() => <LoginPage handleLogin={this.handleLogin} />} />
        <Route path='/signup' component={() => <SignUpPage handleSignUp={this.handleSignUp} allLanguages={this.state.allLanguages} />} />
        <Route path='/home' component={() => <ChatApp currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} allLanguages={this.state.allLanguages} />} />
        <Route path='/profile' component={() => <Profile currentUser={this.state.currentUser} allLanguages={this.state.allLanguages} history={this.props.history} />} />

      </div>

    )
  }

}

export default withRouter(App);
