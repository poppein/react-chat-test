import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../components/Chat';
import {connect} from 'react-redux';
import {textMessage} from '../actions';
import {ChatClient} from '../services/chatClient';

export class Root extends React.Component {
    constructor(props) {
        super(props);
        let {dispatch} = this.props;
        this.chatClient = new ChatClient({dispatch});
        this.chatClient.connect('ws://localhost:1337');
    }

    send(text) {
        let {dispatch} = this.props;
        let message = textMessage(text);
        this.chatClient.sendMessage(message);
        dispatch(message);
    }

    render() {
        let {messages, nickname} = this.props;
        return (
            <div>
                <Chat messages={messages} onMessageSubmitted={(text) => this.send(text)} nickname={nickname}/>
            </div>
        );
    }
}

Root.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    nickname: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        nickname: state.nickname
    };
};

export default connect(mapStateToProps)(Root);
