import test from 'ava';
import sinon from 'sinon';
import reducerFunc from '../../src/frontend/reducers';
import {textMessage, changeNickname} from '../../src/frontend/actions';

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
            date: 500
        }]
    });
});

test('should add nickname when handling CHANGE_NICKNAME', t => {
    clock.tick(500);
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

test.after(() => {
    clock.restore();
});