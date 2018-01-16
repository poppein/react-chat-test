import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatTyping.scss';

const ChatTyping = ({userTyping, isTyping}) => {
    return (
        <div className={'chatTyping'}>
            {
                isTyping ? `${userTyping} is typing...` : ''
            }
        </div>
    );
};

ChatTyping.propTypes = {
    isTyping: PropTypes.bool,
    userTyping: PropTypes.string
};

export default ChatTyping;