
import { createStore } from 'redux'
import reducer from '../../src/client/reducers';
import SoundService from '../../src/client/services/sounds';
import sinon from 'sinon';
import * as actions from '../../src/client/actions/competitors';
import chai from 'chai';
const should = chai.should();


describe('Sound Service', ()=>{
    let store;
    beforeEach(()=>{
        store = createStore(reducer, {
            nextId:5,
            players: {
                2: {score: 2, chances: 3},
                5: {score: 5, chances: 1}
            }
        })
    });
    it('should play loose sound when lost chance ', ()=>{
        const sounds = {play:sinon.spy()};
        SoundService(store, sounds);
        store.dispatch(actions.takeChance(2));
        sounds.play.withArgs('loose').calledOnce.should.equal(true);
    });
    it('should play loose_all sound when lost last chance', ()=>{
        const sounds = {play:sinon.spy()};
        SoundService(store, sounds);
        store.dispatch(actions.takeChance(5));
        sounds.play.withArgs('loose_all').calledOnce.should.equal(true);
    });
    it('should play win sound when score increased', ()=>{
        const sounds = {play:sinon.spy()};
        SoundService(store, sounds);
        store.dispatch(actions.addPoints(2, 1));
        sounds.play.withArgs('win').calledOnce.should.equal(true);
    });
    it('should not play win sound when score decreased', ()=>{
        const sounds = {play:sinon.spy()};
        SoundService(store, sounds);
        store.dispatch(actions.addPoints(2, -1));
        sounds.play.called.should.equal(false);
    });
});