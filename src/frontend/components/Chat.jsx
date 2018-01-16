import React from 'react';
import PropTypes from 'prop-types';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import styles from '../scss/Chat.scss';

const Chat = ({messages, onMessageSubmitted, nickname}) => {
    return (
        <div className={'chatbox'}>
            <ChatHeader nickname={nickname}/>
            <ChatDisplay messages={messages}/>
            <ChatInput onMessageSubmitted={onMessageSubmitted}/>
        </div>
    );
};

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
    nickname: PropTypes.string,
    onMessageSubmitted: PropTypes.func.isRequired
};

export default Chat;