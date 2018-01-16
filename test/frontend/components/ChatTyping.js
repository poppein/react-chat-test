/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChatTyping from '../../../src/frontend/components/ChatTyping';

configure({adapter: new Adapter()});

test('should render a div with right class', t => {
    let wrapper = shallow(<ChatTyping />);
    t.true(wrapper.hasClass('chatTyping'));
});

test('should render proper text when typing', t => {
    let wrapper = shallow(<ChatTyping isTyping userTyping={'John'}/>);
    t.is(wrapper.props().children, 'John is typing...');
});

test('should render proper text when not typing', t => {
    let wrapper = shallow(<ChatTyping userTyping={'John'}/>);
    t.is(wrapper.props().children, '');
});
