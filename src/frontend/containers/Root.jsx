import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../components/Chat';
import {connect} from 'react-redux';
import {textMessage} from '../actions';

export const Root = ({messages, dispatch, nickname}) => {
    return (
        <div>
            <Chat messages={messages} onMessageSubmitted={(text) => dispatch(textMessage(text))} nickname={nickname}/>
        </div>
    );
};

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
