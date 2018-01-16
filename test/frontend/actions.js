import test from 'ava';
import sinon from 'sinon';
import {textMessage, changeNickname} from '../../src/frontend/actions';

let clock;

test.before(() => {
    clock = sinon.useFakeTimers();
});

test('textMessage should return proper action', t => {
    clock.tick(500);
    let action = textMessage('hello word', 'fade');
    t.deepEqual(action, {
        type: 'TEXT_MESSAGE',
        payload: {
            from: 'me',
            text: 'hello word',
            date: 500,
            styles: 'fade'
        }
    });
});

test('changeNickname should return proper action', t => {
    let action = changeNickname('newNickname');
    t.deepEqual(action, {
        type: 'CHANGE_NICKNAME',
        payload: {
            from: 'me',
            nickname: 'newNickname'
        }
    });
});

test.after(() => {
    clock.restore();
});