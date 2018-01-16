import test from 'ava';
import sinon from 'sinon';
import reducerFunc from '../../src/frontend/reducers';
import {textMessage, changeNickname, deleteLast} from '../../src/frontend/actions';

let clock;

test.before(() => {
    clock = sinon.useFakeTimers();
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

test.after(() => {
    clock.restore();
});