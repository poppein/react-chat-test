import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatMessage.scss';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';

class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }
    componentDidMount() {
        setTimeout(() => {
          this.setState({show: true});
        }, 10);
    }

    parseSmiley(messageText) {
        let parsed = reactStringReplace(messageText, '(wink)', (match, i) => (<img key={i} className='smiley' src='../assets/winking_face.png'/>));
        parsed = reactStringReplace(parsed, '(smile)', (match, i) => (<img key={i} className='smiley' src='../assets/smiling_face.png'/>));
        return parsed;
    }

    render() {
        let {message} = this.props;
        let className = classNames('chatMessage', {fromMe: message.from === 'me'}, {fromThem: message.from === 'them'}, message.styles, {show: this.state.show});
        let messageParsed = this.parseSmiley(message.text);
        return (
                <div className={className}>
                    {messageParsed}
                </div>
            );
    }
}

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default ChatMessage;