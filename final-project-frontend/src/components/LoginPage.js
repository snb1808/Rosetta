import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {

    return (
        <div className='login_page form_holder'>
            <form required className='login_form' onSubmit={handleLogin}>
            <div>
                < input required type = "email"
                name = 'email'
                pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder = 'Email' / >
                < input required type = "password"
                name = 'password'
                placeholder = 'Password' / >
                <input className='button' type='submit' value='Log In'/>
            </div>
            </form>
            <Link to='/signup'>New to Rosetta? Sign Up here.</Link>
        </div>
    )
}

export default LoginPage