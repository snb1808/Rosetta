import React from 'react';

const EditLanguageSelect = ({ handleEditLanguage, allLanguages }) => {

    return (
        <form onSubmit={handleEditLanguage}>
            <select className='button drop_down' name='language'>
                {allLanguages.map(language => <option key={language.id} value={language.id}> {language.name} - {language.code} </option>)}
            </select>
            <input className='button' type='submit' value='Submit' />
        </form>
    )

}

export default EditLanguageSelect