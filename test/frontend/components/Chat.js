/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Chat from '../../../src/frontend/components/Chat';
import ChatTyping from '../../../src/frontend/components/ChatTyping';
import ChatHeader from '../../../src/frontend/components/ChatHeader';
import ChatDisplay from '../../../src/frontend/components/ChatDisplay';
import ChatInput from '../../../src/frontend/components/ChatInput';

configure({adapter: new Adapter()});

let messages = [{text: 'hello'}, {text: 'hi'}, {text: 'how are ya ?'}];

test('should render a div with right class', t => {
    let wrapper = shallow(<Chat messages={messages} onMessageSubmitted={sinon.spy()} nickname={'testNickname'}/>);
    t.true(wrapper.hasClass('chatbox'));
});

test('should render a header with right nickname', t => {
    let wrapper = shallow(<Chat messages={messages} onMessageSubmitted={sinon.spy()} nickname={'testNickname'}/>);
    let header = wrapper.find(ChatHeader);
    t.is(header.length, 1);
    t.is(header.props().nickname, 'testNickname');
});

test('should render a display with all messages', t => {
    let wrapper = shallow(<Chat messages={messages} onMessageSubmitted={sinon.spy()} nickname={'testNickname'}/>);
    let display = wrapper.find(ChatDisplay);
    t.is(display.length, 1);
    t.deepEqual(display.props().messages, messages);
});

test('should render an input to type in text', t => {
    let spy = sinon.spy();
    let spy2 = sinon.spy();
    let wrapper = shallow(<Chat messages={messages} onMessageSubmitted={spy} nickname={'testNickname'} onUserTyping={spy2}/>);
    let input = wrapper.find(ChatInput);
    t.is(input.length, 1);
    t.is(input.props().onMessageSubmitted, spy);
    t.is(input.props().onUserTyping, spy2);
});

test('should render a component to display when user is typing', t => {
    let spy = sinon.spy();
    let wrapper = shallow(<Chat messages={messages} onMessageSubmitted={sinon.spy()} nickname={'testNickname'} isTyping/>);
    let typing = wrapper.find(ChatTyping);
    t.is(typing.length, 1);
    t.is(typing.props().userTyping, 'testNickname');
    t.is(typing.props().isTyping, true);
});