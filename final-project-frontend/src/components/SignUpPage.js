import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = ({ handleSignUp, allLanguages }) => {

    return (
        <div className='signup_page form_holder'>
        <form className='signup_form' onSubmit={handleSignUp}>
            <div>
                <input type="text" name='firstName' placeholder='First Name' />
                <input type="text" name='lastName' placeholder='Last Name' />
                <input type="text" name='email' placeholder='Email' />
                <input type="text" name='profilePicture' placeholder='Profile Picture URL' />
                <span className='select'>Select your language:</span>
                <select className='button drop_down' name='language'>
                    {allLanguages.map(language => <option key={language.id} value={language.id}> {language.name} - {language.code} </option>)}
                </select>
                <input type="password" name='password' placeholder='Password'/>
                <input className='button' type='submit' value='Sign Up'/>
            </div>
        </form>
        <Link to='/login'>Already have an account? Log In here.</Link>
        </div>
        )

}

export default SignUpPage
