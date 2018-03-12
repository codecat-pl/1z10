import React from "react";
import {mount, shallow} from "enzyme";
import {expect} from "chai";

import Chances from "../../../src/client/elements/chances";

describe('<Chances />', ()=>{
    it('should present three chances even if value >4 ', ()=>{
        const wrapper = shallow(<Chances value={4}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(true);
    });
    it('should present three chances', ()=>{
        const wrapper = shallow(<Chances value={3}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(true);
    });
    it('should present two chances', ()=>{
        const wrapper = shallow(<Chances value={2}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(false);
    });
    it('should present one chances', ()=>{
        const wrapper = shallow(<Chances value={1}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(true);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(false);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(false);
    });
    it('should present zero chances', ()=>{
        const wrapper = shallow(<Chances value={0}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(false);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(false);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(false);
    });
    it('should present zero chances even if value <0', ()=>{
        const wrapper = shallow(<Chances value={-1}/>);
        expect(wrapper.find('.chance.chance_1.available').exists()).to.equal(false);
        expect(wrapper.find('.chance.chance_2.available').exists()).to.equal(false);
        expect(wrapper.find('.chance.chance_3.available').exists()).to.equal(false);
    });
});
