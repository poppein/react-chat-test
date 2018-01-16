import test from 'ava';
import sinon from 'sinon';
import reducerFunc from '../../src/frontend/reducers';
import {textMessage, changeNickname, deleteLast, fadeLast, userTyping} from '../../src/frontend/actions';
import * as dbFunc from '../../src/frontend/services/db';

let clock, saveMessagesStub, saveNicknamesStub;

test.before(() => {
    clock = sinon.useFakeTimers();
    saveMessagesStub = sinon.stub(dbFunc, 'saveMessages');
    saveNicknamesStub = sinon.stub(dbFunc, 'saveNicknames');
});

test('should add message to messages when handling TEXT_MESSAGE', t => {
    clock.tick(500);
    let action = textMessage('hi');
    let state = {messages: []};

    let newState = reducerFunc(state, action);

    t.deepEqual(newState, {
        messages: [{
            from: 'me',
            text: 'hi',
            date: 500,
            styles: undefined
        }]
    });
});

test('should save messages when handling TEXT_MESSAGE', t => {
    clock.tick(500);
    let action = textMessage('hi');
    let state = {messages: [{text: 'message'}]};

    let newState = reducerFunc(state, action);

    t.true(saveMessagesStub.withArgs(newState.messages).called);
});

test('should add nickname when handling CHANGE_NICKNAME', t => {
    let action = changeNickname('Pierre');
    let state = {nicknames: {me: 'Anonymous', them: 'Anonymous'}};

    let newState = reducerFunc(state, action);

    t.deepEqual(newState, {
        nicknames: {
            me: 'Pierre',
            them: 'Anonymous'
        }
    });
});

test('should remove last message of the user when handling DELETE_LAST_MESSAGE', t => {
    let action = deleteLast();
    let state = {messages: [{text: 'hey', date: 1, from: 'me'}, {text: 'hi', date: 2, from: 'them'}, {text: 'whassup', date: 3, from: 'me'}, {text: 'not much', date: 4, from: 'them'}]};

    let newState = reducerFunc(state, action);

    t.deepEqual(newState, {
        messages: [{text: 'hey', date: 1, from: 'me'}, {text: 'hi', date: 2, from: 'them'}, {text: 'not much', date: 4, from: 'them'}]
    });
});

test('should save messages when handling DELETE_LAST_MESSAGE', t => {
    let action = deleteLast();
    let state = {messages: [{text: 'hey', date: 1, from: 'me'}, {text: 'hi', date: 2, from: 'them'}]};

    let newState = reducerFunc(state, action);

    t.true(saveMessagesStub.withArgs(newState.messages).called);
});

test('should add proper style to last message when handling FADE_LAST', t => {
    let action = fadeLast();
    let state = {messages: [{text: 'hey', date: 1, from: 'me'}, {text: 'hi', date: 2, from: 'them'}]};

    let newState = reducerFunc(state, action);

    t.deepEqual(newState, {
        messages: [{text: 'hey', date: 1, from: 'me'}, {text: 'hi', date: 2, from: 'them', styles: 'fade'}]
    });
});

test('should set isTyping when handling USER_TYPING of other user', t => {
    let action = userTyping(true);
    let state = {isTyping: false};

    let newState = reducerFunc(state, action);

    t.deepEqual(newState, {isTyping: false});

    action.payload.from = 'them';
    newState = reducerFunc(state, action);

    t.deepEqual(newState, {isTyping: true});
});

test.after(() => {
    clock.restore();
});