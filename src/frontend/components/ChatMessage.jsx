import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatMessage.scss';

const ChatMessage = ({message}) => {
    return (
            <div className={'chatMessage'}>
                {message.text}
            </div>
        );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;