import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatMessage.scss';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';

const ChatMessage = ({message}) => {
    const parseSmiley = (messageText) => {
        let parsed = reactStringReplace(messageText, '(wink)', (match, i) => (<img key={i} className='smiley' src='../assets/winking_face.png'/>));
        parsed = reactStringReplace(parsed, '(smile)', (match, i) => (<img key={i} className='smiley' src='../assets/smiling_face.png'/>));
        return parsed;
    };

    let className = classNames('chatMessage', {fromMe: message.from === 'me'}, {fromThem: message.from === 'them'}, message.styles);
    let messageParsed = parseSmiley(message.text);
    return (
            <div className={className}>
                {messageParsed}
            </div>
        );
};

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;