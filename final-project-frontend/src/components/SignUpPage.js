import React from 'react';

const SignUpPage = ({ handleSignUp, allLanguages }) => {

    return (
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
        )

}

export default SignUpPage
