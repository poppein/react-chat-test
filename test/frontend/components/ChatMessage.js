/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChatMessage from '../../../src/frontend/components/ChatMessage';

configure({adapter: new Adapter()});

test('should render a div with right class', t => {
    let wrapper = shallow(<ChatMessage message={{text: 'hello'}}/>);
    t.true(wrapper.hasClass('chatMessage'));
});

test('should render the message text passed in', t => {
    let wrapper = shallow(<ChatMessage message={{text: 'hello'}}/>);
    t.is(wrapper.props().children, 'hello');
});