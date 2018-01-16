import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatHeader.scss';

const ChatHeader = ({nickname}) => {
    return (
        <div className={'chatHeader'}>
           {'Chatting with'}&nbsp;<span className={'nickName'}>{nickname}</span>
        </div>
    );
};

ChatHeader.propTypes = {
    nickname: PropTypes.string
};

export default ChatHeader;