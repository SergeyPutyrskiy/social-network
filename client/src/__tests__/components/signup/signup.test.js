import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../../../containers/signup';

describe('<Signup />', () => {
    test('renders correctly', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper).toMatchSnapshot();
    });
});