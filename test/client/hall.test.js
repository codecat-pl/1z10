import React from "react";
import {mount, shallow} from "enzyme";
import {expect} from "chai";
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import sinon from 'sinon';
import reducer from "../../src/client/reducers/competitors";
import AddCompetitorButton from "../../src/client/elements/add_competitor_button";
import ConnectedHall,{Hall} from '../../src/client/elements/hall';
import {Competitor} from "../../src/client/elements/competitor";

describe('<ConnectedHall/>', ()=> {
    let store;
    const Jas = {photo: 'jan.png', name: 'Jan', score: 3, chances: 1};
    beforeEach(() => {
        store = createStore(reducer, {
            competitors: {
                nextId: 2,
                players: {
                    1: Jas
                }
            }
        });
    });

    it('should have an image', function () {
        const wrapper = mount(<Provider store={store}><ConnectedHall/></Provider>);
        expect(wrapper.find(Competitor)).to.have.length(1);
    });
});

function setup(){
    const actions = {
        create: sinon.spy()
    };

    const component = shallow(<Hall competitors={{players:[]}} {...actions}/>);

    return {
        component,
        actions,
        createCompetitorAction: component.find(AddCompetitorButton).prop('onClick')
    }
}

describe('<Hall/>', ()=>{
    it('should create new competitor when createCompetitor is called an image', function () {
        const {createCompetitorAction, actions} = setup();
        createCompetitorAction();
        expect(actions.create.calledOnce).to.equal(true);
    });
});
