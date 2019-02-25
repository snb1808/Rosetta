import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ChatApp from './containers/ChatApp'
import API from './adapters/API'

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
      }
      API.getLanguages().then(data => this.setState({ allLanguages: data }))
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
    if (localStorage.token) {
      return (
        <ChatApp currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} />
      )
    } else {
    return (
      <div>
        <h1 className='title'>Rosetta</h1>
        Log In:
        <form className='loginForm' onSubmit={this.handleLogin}>
          <div>
            <input type="text" name='email' placeholder='Email'/>
            <input type="password" name='password' placeholder='Password'/>
            <input className='button' type='submit' value='Log In'/>
          </div>
        </form>
        Or Create a New User:
        <form className='signUpForm' onSubmit={this.handleSignUp}>
          <div>
            <input type="text" name='firstName' placeholder='First Name' />
            <input type="text" name='lastName' placeholder='Last Name' />
            <input type="text" name='email' placeholder='Email' />
            <input type="text" name='profilePicture' placeholder='Profile Picture URL' />
            <select className='button drop_down' name='language'>
              {this.state.allLanguages.map(language => <option key={language.id} value={language.id}> {language.name} - {language.code} </option>)}
            </select>
            <input type="password" name='password' placeholder='Password'/>
            <input className='button' type='submit' value='Sign Up'/>
          </div>
        </form>
      </div>

    )
  }
  }


}

export default App;
