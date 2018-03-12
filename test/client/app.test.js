const React = require('react');
const { mount, shallow } = require('enzyme');
const {expect} = require('chai');

import { render } from 'react-dom'

import initApp from '../../src/client/app';
import initStore from '../../src/client/store';
import * as actions from '../../src/client/actions/competitors';
import ConnectedHall from '../../src/client/elements/hall';
import Competitor from '../../src/client/elements/competitor';




describe('<App />', () => {
    it('should create hall element', () => {
        const store = initStore();
        const App = initApp(store);
        const wrapper = shallow(<App/>);
        expect(wrapper.find(ConnectedHall)).to.have.length(1);
    });

    it('should update when store changes', ()=>{
        const store = initStore();
        const App = initApp(store);
        const wrapper = mount(<App/>);
        expect(wrapper.find(Competitor)).to.have.length(0);
        store.dispatch(actions.create('jan.png', 'Jan'));
        wrapper.update();
        expect(wrapper.find(Competitor)).to.have.length(1);
    })
});
