/*eslint react/jsx-filename-extension:0*/

import test from 'ava';
import sinon from 'sinon';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Chat from '../../../src/frontend/components/Chat';

configure({adapter: new Adapter()});

test('should render a div with right class', t => {
    let wrapper = shallow(<Chat />);
    t.true(wrapper.hasClass('chatbox'));
});