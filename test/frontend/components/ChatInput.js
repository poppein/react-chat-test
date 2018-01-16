/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChatInput from '../../../src/frontend/components/ChatInput';

configure({adapter: new Adapter()});

test('should render a div with right class', t => {
    let wrapper = shallow(<ChatInput onMessageSubmitted={sinon.spy()}/>);
    t.true(wrapper.hasClass('chatInput'));
});

test('should have a text field and a submit button', t => {
    let wrapper = shallow(<ChatInput onMessageSubmitted={sinon.spy()}/>);
    let textInput = wrapper.find('[type="text"]');
    t.is(textInput.length, 1);
    let submitButton = wrapper.find('[type="submit"]');
    t.is(submitButton.length, 1);
});

test('should raise onMessageSubmitted with proper text when submitting', t => {
    let messageSubmittedSpy = sinon.spy();
    let wrapper = shallow(<ChatInput onMessageSubmitted={messageSubmittedSpy}/>);
    wrapper.find('[type="text"]').simulate('change', {target: {value: 'hello world'}});
    wrapper.find('form').simulate('submit', {preventDefault: sinon.spy()});

    t.is(messageSubmittedSpy.withArgs('hello world').callCount, 1);
});
