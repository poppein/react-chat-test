import test from 'ava';
import sinon from 'sinon';
import reducerFunc from '../../src/frontend/reducers';
import {textMessage} from '../../src/frontend/actions';

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

test.after(() => {
    clock.restore();
});