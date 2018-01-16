import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import styles from '../scss/ChatDisplay.scss';
import _ from 'lodash';

const ChatDisplay = ({messages}) => {
    return (
        <div className={'chatDisplay'}>
            {
                _.map(messages, (message, key) => (<ChatMessage key={key} message={message}/>))
            }
        </div>
    );
};

ChatDisplay.propTypes = {
    messages: PropTypes.array.isRequired
};

export default ChatDisplay;