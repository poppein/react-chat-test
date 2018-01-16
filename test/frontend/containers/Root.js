/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Root} from '../../../src/frontend/containers/Root';
import Chat from '../../../src/frontend/components/Chat';
import {textMessage, changeNickname} from '../../../src/frontend/actions';
import {ChatClient} from '../../../src/frontend/services/chatClient';

configure({adapter: new Adapter()});

let messages = [{text: 'hello'}, {text: 'hi'}, {text: 'how are ya ?'}];
let clock, sendMessageStub, constructorStub, connectStub;

test.before(() => {
    clock = sinon.useFakeTimers();
    constructorStub = sinon.stub(ChatClient.prototype, 'constructor');
    sendMessageStub = sinon.stub(ChatClient.prototype, 'sendMessage');
    connectStub = sinon.stub(ChatClient.prototype, 'connect');
});

test('should render a Chat with proper messages and nickname', t => {
    let wrapper = shallow(<Root messages={messages} dispatch={sinon.spy()} nickname={'test'}/>);
    let chat = wrapper.find(Chat);

    t.is(chat.length, 1);
    t.deepEqual(chat.props().messages, messages);
    t.is(chat.props().nickname, 'test');
});

test('should dispatch a default parser action when new message typed in chat and no parser successfully parsed it', t => {
    let dispatchSpy = sinon.spy();
    let parsers = {
        default: sinon.stub().withArgs('hey there').returns('message'),
        parser1: sinon.stub(),
        parser2: sinon.stub()
    };

    let wrapper = shallow(<Root messages={messages} dispatch={dispatchSpy} nickname={'test'} parsers={parsers}/>);
    wrapper.find(Chat).props().onMessageSubmitted('hey there');

    t.is(dispatchSpy.callCount, 1);
    t.deepEqual(dispatchSpy.getCall(0).args[0], 'message');
});

test('should dispatch the parser action when successfully parsing new message typed in chat', t => {
    let dispatchSpy = sinon.spy();
    let parsers = {
        default: sinon.stub().withArgs('hoy there').returns('message'),
        parser1: sinon.stub().withArgs('hoy there').returns('parsed'),
        parser2: sinon.stub()
    };

    let wrapper = shallow(<Root messages={messages} dispatch={dispatchSpy} nickname={'test'} parsers={parsers}/>);
    wrapper.find(Chat).props().onMessageSubmitted('hoy there');

    t.is(dispatchSpy.callCount, 1);
    t.deepEqual(dispatchSpy.getCall(0).args[0], 'parsed');
});

test('should connect to server', t => {
    let dispatchSpy = sinon.spy();
    let wrapper = shallow(<Root messages={messages} dispatch={dispatchSpy} nickname={'test'}/>);

    t.true(connectStub.withArgs('ws://localhost:1337').called);
});

test('should send parsed message to server', t => {
    let parsers = {
        default: sinon.stub().withArgs('hoy hoy').returns('messageParsed'),
        parser1: sinon.stub(),
        parser2: sinon.stub()
    };

    let wrapper = shallow(<Root messages={messages} dispatch={sinon.spy()} nickname={'test'} parsers={parsers}/>);
    wrapper.find(Chat).props().onMessageSubmitted('hoy hoy');

    t.is(sendMessageStub.withArgs('messageParsed').callCount, 1);
});

test.after(() => {
    clock.restore();
});
