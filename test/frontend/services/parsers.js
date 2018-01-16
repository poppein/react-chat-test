import test from 'ava';
import sinon from 'sinon';
import {textMessage, changeNickname} from '../../../src/frontend/actions';
import * as parsers from '../../../src/frontend/services/parsers';

let clock;

test.before(() => {
    clock = sinon.useFakeTimers();
});

test('default parser should return a plain text message', t => {
    clock.tick(500);
    let expected = textMessage('hello word');
    t.deepEqual(parsers.default('hello word'), expected);
});

test('nickname parser should return undefined when not provided the right text', t => {
    t.deepEqual(parsers.nick('bla bla'), undefined);
});

test('nickname parser should return a changeNickname message when provided the right text', t => {
    let expected = changeNickname('Pierre');
    t.deepEqual(parsers.nick('/nick Pierre'), expected);
});

test.after(() => {
    clock.restore();
});