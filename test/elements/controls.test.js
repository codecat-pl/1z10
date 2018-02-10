import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon';
import Controls from '../../src/client/elements/controls'

function setup() {
    const actions = {
        onAddPoints: sinon.spy(),
        onRemove: sinon.spy(),
        onGiveChance: sinon.spy(),
        onTakeChance: sinon.spy()
    };

    const eventArgs = {
        preventDefault: sinon.spy()
    };

    const component = shallow(
        <Controls playerId={1} {...actions} />
    );

    return {
        component: component,
        removeAction: component.find('.remove_competitor'),
        addOnePointAction: component.find('.add_one_point'),
        addTenPointsAction: component.find('.add_ten_points'),
        subTenPointsAction: component.find('.sub_ten_points'),
        subOnePointAction: component.find('.sub_one_point'),
        actions: actions,
        eventArgs: eventArgs
    }
}

describe('<Controls/>', ()=>{
    it('should call action for adding one point if button is clicked', ()=>{
        const {actions, addOnePointAction} = setup();
        addOnePointAction.simulate('click');
        actions.onAddPoints.withArgs(1).calledOnce.should.equal(true);
    });

    it('should call action for adding ten point if button is clicked', ()=>{
        const {actions, addTenPointsAction} = setup();
        addTenPointsAction.simulate('click');
        actions.onAddPoints.withArgs(10).calledOnce.should.equal(true);
    });
    it('should call action for subtracting ten point if button is clicked', ()=>{
        const {actions, subTenPointsAction} = setup();
        subTenPointsAction.simulate('click');
        actions.onAddPoints.withArgs(-10).calledOnce.should.equal(true);
    });
    it('should call action for subtracting one point if button is clicked', ()=>{
        const {actions, subOnePointAction} = setup();
        subOnePointAction.simulate('click');
        actions.onAddPoints.withArgs(-1).calledOnce.should.equal(true);
    });

    it('should call remove player action if button is clicked', ()=>{
        const {actions, removeAction} = setup();
        removeAction.simulate('click');
        actions.onRemove.withArgs().calledOnce.should.equal(true);
    });
});
