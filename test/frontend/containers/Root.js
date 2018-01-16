/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Root} from '../../../src/frontend/containers/Root';
import Chat from '../../../src/frontend/components/Chat';
import {textMessage} from '../../../src/frontend/actions';

configure({adapter: new Adapter()});

let messages = [{text: 'hello'}, {text: 'hi'}, {text: 'how are ya ?'}];
let clock;

test.before(() => {
    clock = sinon.useFakeTimers();
});

test('should render a Chat with proper messages and nickname', t => {
    let wrapper = shallow(<Root messages={messages} dispatch={sinon.spy()} nickname={'test'}/>);
    let chat = wrapper.find(Chat);

    t.is(chat.length, 1);
    t.deepEqual(chat.props().messages, messages);
    t.is(chat.props().nickname, 'test');
});

test('should dispatch a textMessage action when new message typed in chat', t => {
    let dispatchSpy = sinon.spy();
    let wrapper = shallow(<Root messages={messages} dispatch={dispatchSpy} nickname={'test'}/>);
    wrapper.find(Chat).props().onMessageSubmitted('hey there');

    let expected = textMessage('hey there');

    t.is(dispatchSpy.callCount, 1);
    t.deepEqual(dispatchSpy.getCall(0).args[0], expected);
});

test.after(() => {
    clock.restore();
});