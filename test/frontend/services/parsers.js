import test from 'ava';
import sinon from 'sinon';
import {textMessage, changeNickname, deleteLast, fadeLast} from '../../../src/frontend/actions';
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

test('think parser should return undefined when not provided the right text', t => {
    t.deepEqual(parsers.think('bla bla'), undefined);
});

test('think parser should return a text message with think style when provided the right text', t => {
    let expected = textMessage('something', 'think');
    t.deepEqual(parsers.think('/think something'), expected);
});

test('oops parser should return undefined when not provided the right text', t => {
    t.deepEqual(parsers.oops('bla bla'), undefined);
});

test('oops parser should return a deleteLast message when provided the right text', t => {
    let expected = deleteLast();
    t.deepEqual(parsers.oops('/oops'), expected);
});

test('fdl parser should return undefined when not provided the right text', t => {
    t.deepEqual(parsers.fdl('bla bla'), undefined);
});

test('fdl parser should return a fadeLast message when provided the right text', t => {
    let expected = fadeLast();
    t.deepEqual(parsers.fdl('/fadelast'), expected);
});

test('highlight parser should return undefined when not provided the right text', t => {
    t.deepEqual(parsers.highlight('bla bla'), undefined);
});

test('highlight parser should return a text message with highlight style when provided the right text', t => {
    let expected = textMessage('something', 'highlight');
    t.deepEqual(parsers.highlight('/highlight something'), expected);
});

test.after(() => {
    clock.restore();
});