import React, {Component} from 'react';
import {mount,  shallow } from 'enzyme'
import sinon from 'sinon';

import Avatar from '../../src/client/elements/avatar';
import Score from '../../src/client/elements/score';
import Chances from '../../src/client/elements/chances';
import Controls from '../../src/client/elements/controls';
import {Competitor} from '../../src/client/elements/competitor'

import chai from 'chai';
const expect = chai.expect;

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
        controlsElement: component.find(Controls),
        scoreElement: component.find(Score),
        avatarElement: component.find(Avatar),
        chancesElement: component.find(Chances),
        removeAction: component.find(Controls).prop('onRemove'),
        addPointsAction: component.find(Controls).prop('onAddPoints'),
        giveChanceAction: component.find(Controls).prop('onGiveChance'),
        takeChanceAction: component.find(Controls).prop('onTakeChance'),
        changeNameAction: component.find(Score).prop('onChangeName'),
        actions: actions,
        eventArgs: eventArgs
    }
}

describe('<Competitor/>', ()=>{
    let user;
    beforeEach(()=>{
        user = {
            photo: 'jan.png',
            name: "Jan",
            chances: 2,
            score: 123
        };
    });
    it('should have avatar', function () {
        const {avatarElement} = setup();
        expect(avatarElement.exists()).to.equal(true);
        expect(avatarElement.prop('photo')).to.equal('jan.png');
    });
    it('should have score', function () {
        const {scoreElement} = setup();
        expect(scoreElement.exists()).to.equal(true);
        expect(scoreElement.prop('value')).to.equal(123);
        expect(scoreElement.prop('name')).to.equal('Jan');
    });

    it('should have score with action changeName', ()=>{
        const {changeNameAction, actions} = setup();
        changeNameAction("Oko");
        expect(actions.changeName.withArgs(1, "Oko").calledOnce).to.equal(true);
    });

    it('should have chances', function () {
        const {chancesElement} = setup();
        expect(chancesElement.exists()).to.equal(true);
        expect(chancesElement.prop('value')).to.equal(2);
    });

    it('should have controls', function () {
        const {controlsElement, actions} = setup();
        expect(controlsElement.exists()).to.equal(true);
    });

    it('should have controls with action giveChance', function () {
        const {giveChanceAction, actions} = setup();
        giveChanceAction();
        expect(actions.giveChance.withArgs(1).calledOnce).to.equal(true);
    });
    it('should have controls with action takeChance', ()=>{
        const {takeChanceAction, actions} = setup();
        takeChanceAction();
        expect(actions.takeChance.withArgs(1).calledOnce).to.equal(true);
    });
    it('should have controls with action addPoints', ()=>{
        const {addPointsAction, actions} = setup();
        addPointsAction(123);
        expect(actions.addPoints.withArgs(1, 123).calledOnce).to.equal(true);
    });

    it('should have controls with action remove', ()=>{
        const {removeAction, actions} = setup();
        removeAction();
        expect(actions.remove.withArgs(1).calledOnce).to.equal(true);
    });


    it('should not have class loose if have at least one chance', function () {
        const {component} = setup(1);
        expect(component.find('.lose').exists()).to.equal(false);
    });

    it('should add class loose if no chances left', function () {
        const {component, data} = setup(1);
        data.chances = 0;
        component.setProps({data});
        component.update();
        expect(component.find('.lose').exists()).to.equal(true);
    });
});