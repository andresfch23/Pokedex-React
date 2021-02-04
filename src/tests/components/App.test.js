import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../components/App';

let wrapper, addPokemons, addTypes;

beforeEach(() => {
    addPokemons = jest.fn();
    addTypes = jest.fn();
    wrapper = shallow(<App addPokemons={addPokemons} addTypes={addTypes} />)
}); 

describe('<App />', () => {
    it('Should render App Component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});