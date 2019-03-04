import React from 'react';
import { Link } from 'react-router-dom';
import Settings from '../components/Settings'

const Profile = ({ currentUser, updateCurrentUser, history, allLanguages }) => {
    
    return (
            <div className='home profile'>
                <div className='profile_column'>
                    <Link to='/home'>
                        <i className="fas fa-arrow-left"/>
                    </Link>
                    <h1>Profile</h1>
                    <h2>{currentUser.first_name} {currentUser.last_name}</h2>
                    <img className='full_profile_picture' src={currentUser.profile_picture} alt='' />
                    <p>{currentUser.email}</p>
                </div>
                <div className='settings_column'>
                    <h2>Settings <i className="fas fa-cog" /></h2>
                    <Settings currentUser={currentUser} updateCurrentUser={updateCurrentUser} allLanguages={allLanguages} history={history} />
                </div>
            </div>
        )

}

export default Profile