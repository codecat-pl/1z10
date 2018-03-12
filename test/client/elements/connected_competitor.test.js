import React, {Component} from 'react';
import { render } from 'react-dom'

import {mount,  shallow } from 'enzyme'
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from "../../../src/client/reducers/competitors";

import ConnectedCompetitor, {Competitor} from '../../../src/client/elements/competitor'

function setup(chances = 2) {
    const actions = {
        addPoints: sinon.spy(),
        remove: sinon.spy(),
        giveChance: sinon.spy(),
        takeChance: sinon.spy(),
        changeName: sinon.spy()
    };

    const eventArgs = {
        preventDefault: sinon.spy(),
        stopPropagation: sinon.spy()
    };

    const data = {
        photo: 'jan.png',
        name: 'Jan',
        chances: chances,
        score: 123,
    };
    const component = mount(<Competitor idx={1} playerId={1} data={data} {...actions} />);


    return {
        data,
        component: component,
        competitorElement: component.find(Competitor),
        actions: actions,
        eventArgs: eventArgs
    }
}


describe('<ConnectedCompetitor/>', ()=> {
    let store;
    beforeEach(() => {
        store = createStore(reducer, {
            competitors: {
                nextId: 2,
                players: {
                    1: {photo: 'jan.png', name: 'Jan', score: 3, chances: 1}
                }
            }
        });
    });

    it('should create competitor from store', function () {
        const wrapper = mount(<Provider store={store}><ConnectedCompetitor playerId={1}/></Provider>);
        expect(wrapper.find(Competitor)).to.have.length(1);
    });

    it('should be empty if competitor not exist', function () {
        const wrapper = mount(<Provider store={store}><ConnectedCompetitor playerId={5}/></Provider>);
        expect(wrapper.find(Competitor).html()).to.equal(null);
    });

    it('should be empty if competitor not exist', function () {
        const wrapper = mount(<Provider store={store}><ConnectedCompetitor playerId={5}/></Provider>);
        expect(wrapper.find(Competitor).html()).to.equal(null);
    });
});