import React from 'react';

const MessageInput = props => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <input type='text' name='content'/>
                <input type='submit' value='Post Message' />
            </form>
        </div>
    )

}

export default MessageInput;