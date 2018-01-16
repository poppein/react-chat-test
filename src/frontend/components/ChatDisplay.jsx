import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import styles from '../scss/ChatDisplay.scss';
import _ from 'lodash';

class ChatDisplay extends React.Component {
    componentDidMount() {
        this.scrollToBottom();
      }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.el.scrollIntoView({behavior: 'smooth'});
        }, 200);
    }

    render() {
        let {messages} = this.props;
        return (
            <div className={'chatDisplay'}>
                {
                    _.map(messages, (message, key) => (<ChatMessage key={key} message={message}/>))
                }
                <div ref={el => { this.el = el; }}/>
            </div>
        );
    }
}

ChatDisplay.propTypes = {
    messages: PropTypes.array.isRequired
};

export default ChatDisplay;