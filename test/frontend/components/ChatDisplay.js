/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChatMessage from '../../../src/frontend/components/ChatMessage';
import ChatDisplay from '../../../src/frontend/components/ChatDisplay';

configure({adapter: new Adapter()});

let messages = [{text: 'hello'}, {text: 'hi'}, {text: 'how are ya ?'}];

test('should render a div with right class', t => {
    let wrapper = shallow(<ChatDisplay messages={messages}/>);
    t.true(wrapper.hasClass('chatDisplay'));
});

test('should render each messages in a ChatMessage', t => {
    let wrapper = shallow(<ChatDisplay messages={messages}/>);
    let chatMessages = wrapper.find(ChatMessage);
    t.is(chatMessages.length, 3);
    t.deepEqual(chatMessages.get(0).props.message, {text: 'hello'});
    t.deepEqual(chatMessages.get(1).props.message, {text: 'hi'});
    t.deepEqual(chatMessages.get(2).props.message, {text: 'how are ya ?'});
});