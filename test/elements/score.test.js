import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Score from "../../src/client/elements/score";

describe('<Score />', ()=>{
    it('should have value of score', ()=>{
        const wrapper = shallow(<Score value={123}  name="Jan"/>);
        expect(wrapper.find('.score').at(0).text()).to.contain("123");
    });
    it('should render new score when changed', ()=>{
        const wrapper = shallow(<Score value={123}  name="Jan"/>);
        wrapper.setProps({value:321, name:"Jan"});
        wrapper.update();
        expect(wrapper.find('.score').at(0).text()).to.contain("321");
    });
    it('should have player name', ()=>{
        const wrapper = shallow(<Score value={123} name="Jan"/>);
        expect(wrapper.find('.name').at(0).prop('value')).to.equal('Jan');
    });

    it('should give possibility to change name', ()=>{
        const changeName = sinon.spy();
        const wrapper = shallow(<Score value={123} name="Jan" onChangeName={changeName}/>);
        const input = wrapper.find('.name').first();
        input.value = 'Mateusz';
        input.simulate('change', {target: input});
        expect(changeName.withArgs("Mateusz").calledOnce).to.equal(true);
    });
});