import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {

    return (
        <div>
            <form className='loginForm' onSubmit={handleLogin}>
            <div>
                <input type="text" name='email' placeholder='Email'/>
                <input type="password" name='password' placeholder='Password'/>
                <input className='button' type='submit' value='Log In'/>
            </div>
            </form>
            <Link to='/signup'>New to Rosetta? Sign Up here.</Link>
        </div>
    )
}

export default LoginPage