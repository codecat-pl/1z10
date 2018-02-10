import React from "react";
import {mount, shallow} from "enzyme";
import {expect} from "chai";
import sinon from 'sinon';


import AddCompetitorButton from "../../src/client/elements/add_competitor_button";

describe('<AddCompetitorButton/>', ()=>{
    it('should add competitors', function () {
        const add = sinon.spy();
        const wrapper = shallow(<AddCompetitorButton onClick={add}/>);
        wrapper.find('.add_competitor').simulate('click');

        expect(add.calledOnce).to.equal(true);
    });
});

