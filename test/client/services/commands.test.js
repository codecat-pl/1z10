
import { createStore } from 'redux'
import reducer from '../../../src/client/reducers/index';
import * as actions from '../../../src/client/actions/competitors';

import CommandsService from '../../../src/client/services/commands';
import Emitter from '../../../src/common/message_bus';
import sinon from 'sinon';
import chai from 'chai';
const should = chai.should();



describe('Commands Service', ()=>{
    let store, events;
    beforeEach(()=>{
        events = new Emitter();
        store = {
            dispatch: sinon.spy()
        };
        CommandsService(events, store);
    });
    describe('add_points', ()=>{
        it('should add points to player', ()=>{
            events.act({cmd: 'add_points', points: 5, player: 1});
            store.dispatch.calledOnce.should.equal(true);
            store.dispatch.getCall(0).args[0].should.deep.equal(actions.addPoints(1,5));
        });
        it('should add point to player when points not defined', ()=>{
            events.act({cmd: 'add_points', player: 1});
            store.dispatch.calledOnce.should.equal(true);
            store.dispatch.getCall(0).args[0].should.deep.equal(actions.addPoints(1));
        });
    })

    describe('give_chance', ()=>{
        it('should add one chance to player', ()=>{
            events.act({cmd: 'give_chance', player: 1});
            store.dispatch.calledOnce.should.equal(true);
            store.dispatch.getCall(0).args[0].should.deep.equal(actions.giveChance(1));
        });
    })

    describe('take_chance', ()=>{
        it('should take one chance from player', ()=>{
            events.act({cmd: 'take_chance', player: 1});
            store.dispatch.calledOnce.should.equal(true);
            store.dispatch.getCall(0).args[0].should.deep.equal(actions.takeChance(1));
        });
    })
});
