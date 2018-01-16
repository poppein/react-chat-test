import React from 'react';
import PropTypes from 'prop-types';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatTyping from './ChatTyping';
import styles from '../scss/Chat.scss';

const Chat = ({messages, onMessageSubmitted, nickname, isTyping, onUserTyping}) => {
    return (
        <div className={'chatbox'}>
            <ChatHeader nickname={nickname}/>
            <ChatDisplay messages={messages}/>
            <ChatTyping userTyping={nickname} isTyping={isTyping}/>
            <ChatInput onMessageSubmitted={onMessageSubmitted} onUserTyping={onUserTyping}/>
        </div>
    );
};

Chat.propTypes = {
    isTyping: PropTypes.bool,
    messages: PropTypes.array.isRequired,
    nickname: PropTypes.string,
    onMessageSubmitted: PropTypes.func.isRequired,
    onUserTyping: PropTypes.func
};

export default Chat;