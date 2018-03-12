import React from "react";
import {mount, shallow} from "enzyme";
import {expect} from "chai";

import config from "../../../src/client/config";
import Avatar from "../../../src/client/elements/avatar";

describe('<Avatar/>', ()=>{
    it('should have an image', function () {
        const wrapper = shallow(<Avatar photo="test.png"/>);
        expect(wrapper.find('img')).to.have.length(1);
        expect(wrapper.find('img').at(0).prop('src')).to.equal("test.png");

    });
    it('should have default image', function () {
        const wrapper = shallow(<Avatar/>);
        expect(wrapper.find('img')).to.have.length(1);
        expect(wrapper.find('img').at(0).prop('src')).to.equal(config.images.default_competitor);

    });
});

