import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatMessage.scss';
import classNames from 'classnames';

const ChatMessage = ({message}) => {
    let className = classNames('chatMessage', {fromMe: message.from === 'me'}, {fromThem: message.from === 'them'});
    return (
            <div className={className}>
                {message.text}
            </div>
        );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;