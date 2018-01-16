import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatInput.scss';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isTyping: false
        };
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
        if (this.state.isTyping) {
            this.stillTyping();
        } else {
            this.startTyping();
        }
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.text !== '') {
            this.setTyping(false);
            let {onMessageSubmitted} = this.props;
            onMessageSubmitted(this.state.text);
            this.setState({text: ''});
        }
    }
    stillTyping() {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.setTyping(false), 1000);
    }

    startTyping() {
        this.setTyping(true);
        this.typingTimer = setTimeout(() => this.setTyping(false), 1000);
    }

    setTyping(value) {
        if (this.state.isTyping !== value) {
            this.setState({isTyping: value});
            let {onUserTyping} = this.props;
            if (onUserTyping) {
                onUserTyping(value);
            }
        }
    }

    render() {
        return (
            <div className={'chatInput'}>
                <form onSubmit={(e) => this.sendMessage(e)}>
                    <input type='text' placeholder='Your message' onChange={(e) => this.handleTextChange(e)} value={this.state.text}/>
                    <input type='submit' value='Send' />
                </form>
            </div>
        );
    }
}

ChatInput.propTypes = {
    onMessageSubmitted: PropTypes.func.isRequired,
    onUserTyping: PropTypes.func
};

export default ChatInput;