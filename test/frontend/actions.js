import test from 'ava';
import sinon from 'sinon';
import {textMessage, changeNickname, deleteLast, fadeLast, userTyping} from '../../src/frontend/actions';

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

test('deleteLast should return proper action', t => {
    let action = deleteLast();
    t.deepEqual(action, {
        type: 'DELETE_LAST_MESSAGE',
        payload: {
            from: 'me'
        }
    });
});

test('fadeLast should return proper action', t => {
    let action = fadeLast();
    t.deepEqual(action, {
        type: 'FADE_LAST',
        payload: {
            from: 'me'
        }
    });
});

test('userTyping should return proper action', t => {
    let action = userTyping(true);
    t.deepEqual(action, {
        type: 'USER_TYPING',
        payload: {
            from: 'me',
            isTyping: true
        }
    });

    action = userTyping(false);
    t.deepEqual(action, {
        type: 'USER_TYPING',
        payload: {
            from: 'me',
            isTyping: false
        }
    });
});

test.after(() => {
    clock.restore();
});