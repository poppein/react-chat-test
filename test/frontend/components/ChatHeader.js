/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChatHeader from '../../../src/frontend/components/ChatHeader';

configure({adapter: new Adapter()});

test('should render a div with right class', t => {
    let wrapper = shallow(<ChatHeader />);
    t.true(wrapper.hasClass('chatHeader'));
});

test('should render the nickname passed via props with right style', t => {
    let wrapper = shallow(<ChatHeader nickname={'testNickname'}/>);
    let nicknameDiv = wrapper.find('.nickName');
    t.is(nicknameDiv.props().children, 'testNickname');
});