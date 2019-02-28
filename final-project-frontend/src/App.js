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
    API.getLanguages().then(data => this.setState({ allLanguages: data }))
    if (localStorage.token) {
      API.getCurrentUser().then(data => {
        this.setState({ currentUser: data.user })
      })
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
    this.props.history.push('/home')
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
    this.props.history.push('/home')
  }

  createUser = newUser => {
    API.createUser(newUser)
      .then(data => this.login(data))
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    this.setState({ currentUser: {} })
    this.props.history.push('/login')
  }

  updateCurrentUser = () => {
    API.getCurrentUser().then(data => {
      this.setState({ currentUser: data.user })
    })
  }

  render() {
    return (
      <div>
        <Route path='/login' component={() => <LoginPage handleLogin={this.handleLogin} />} />
        <Route path='/signup' component={() => <SignUpPage handleSignUp={this.handleSignUp} allLanguages={this.state.allLanguages} />} />
        <Route path='/home' component={() => <ChatApp currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} allLanguages={this.state.allLanguages} />} />
        <Route path='/profile' component={() => <Profile updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser} allLanguages={this.state.allLanguages} history={this.props.history} />} />

      </div>

    )
  }

}

export default withRouter(App);
