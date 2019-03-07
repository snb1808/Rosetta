import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = ({ handleSignUp, allLanguages }) => {

    return (
        <div className='signup_page form_holder'>
        <form className='signup_form' onSubmit={handleSignUp}>
            <div>
                <input required type="text" name='firstName' placeholder='First Name' />
                < input required type = "text"
                name = 'lastName'
                placeholder = 'Last Name' / >
                < input required type = "email"
                name = 'email'
                placeholder = 'Email' / >
                < input required type = "text"
                name = 'profilePicture'
                placeholder = 'Profile Picture URL' / >
                < span required className = 'select' > Select your language: < /span>
                <select className='button drop_down' name='language'>
                    {allLanguages.map(language => <option key={language.id} value={language.id}> {language.name} - {language.code} </option>)}
                </select>
                < input required type = "password"
                name = 'password'
                pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                placeholder = 'Password' / >
                <input className='button' type='submit' value='Sign Up'/>
            </div>
        </form>
        <Link to='/login'>Already have an account? Log In here.</Link>
        </div>
        )

}

export default SignUpPage
