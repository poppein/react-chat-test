import test from 'ava';
import sinon from 'sinon';
import {textMessage} from '../../src/frontend/actions';

let clock;

test.before(() => {
    clock = sinon.useFakeTimers();
});

test('textMessage should return proper action', t => {
    clock.tick(500);
    let action = textMessage('hello word');
    t.deepEqual(action, {
        type: 'TEXT_MESSAGE',
        payload: {
            from: 'me',
            text: 'hello word',
            date: 500
        }
    });
});

test.after(() => {
    clock.restore();
});