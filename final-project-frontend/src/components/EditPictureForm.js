import React from 'react';

const EditPictureForm = ( { handleEditPicture }) => {

    return (
        <form onSubmit={handleEditPicture}>
            <input name='url' type='text' placeholder='Paste URL here' />
            <input type='submit' className='button' value='Submit' />
        </form>
    )

}

export default EditPictureForm