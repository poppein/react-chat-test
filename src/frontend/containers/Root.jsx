import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../components/Chat';

let messages = [{text: 'hello'}, {text: 'hi'}, {text: 'how are ya ?'}];

const Root = () => {
    return (
        <div>
            <Chat messages={messages} onMessageSubmitted={(text) => console.log(text)} nickname={'Anonymous'}/>
        </div>
    );
};

export default Root;