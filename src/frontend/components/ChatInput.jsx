import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/ChatInput.scss';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.text !== '') {
            let {onMessageSubmitted} = this.props;
            onMessageSubmitted(this.state.text);
            this.setState({text: ''});
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
    onMessageSubmitted: PropTypes.func.isRequired
};

export default ChatInput;