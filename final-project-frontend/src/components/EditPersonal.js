import React from 'react';

const EditPersonal = ({ handleEditPersonal, currentUser }) => {

    return (
        <form onSubmit={handleEditPersonal}>
            <input type="text" name='first_name' placeholder={currentUser.first_name} />
            <input type='text' name='last_name' placeholder={currentUser.last_name} />
            <input type='email' name='email' placeholder={currentUser.email} />
            <input type="submit" value='Edit Details'/>
        </form>
    )
}

export default EditPersonal;