import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../components/Chat';
import {connect} from 'react-redux';
import {textMessage, changeNickname} from '../actions';
import {ChatClient} from '../services/chatClient';
import _ from 'lodash';

export class Root extends React.Component {
    constructor(props) {
        super(props);
        let {dispatch} = this.props;
        this.chatClient = new ChatClient({dispatch});
        this.chatClient.connect('ws://localhost:1337');
    }

    send(message) {
        let {dispatch} = this.props;
        this.chatClient.sendMessage(message);
        dispatch(message);
    }

    parseAndSend(text) {
        let message = this.parse(text);
        if (message !== undefined) {
            this.send(message);
        }
    }

    parse(text) {
        let {parsers} = this.props;
        if (parsers) {
            let parsedText;
            _.forEach(parsers, (parser, key) => {
                if (key !== 'default' && _.isUndefined(parsedText)) {
                    parsedText = parser(text);
                }
            });
            if (_.isUndefined(parsedText)) {
                return parsers.default(text);
            }
            return parsedText;
        }
        return text;
    }

    render() {
        let {messages, nickname} = this.props;
        return (
            <div>
                <Chat messages={messages} onMessageSubmitted={(text) => this.parseAndSend(text)} nickname={nickname}/>
            </div>
        );
    }
}

Root.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    nickname: PropTypes.string.isRequired,
    parsers: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        nickname: state.nicknames.them
    };
};

export default connect(mapStateToProps)(Root);
