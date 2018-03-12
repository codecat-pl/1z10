

import SoundService from '../../../src/client/services/sounds';
import Emitter from '../../../src/common/message_bus';
import sinon from 'sinon';
import chai from 'chai';
const should = chai.should();



describe('Manual sound Service', ()=>{
    let sounds, events;
    beforeEach(()=>{
        events = new Emitter();
        sounds = {play: sinon.spy()};
        SoundService(events, sounds);
    });
    it('should play sound from event', ()=>{
        events.act({cmd: 'play_sound', sound: 'test'});
        sounds.play.calledOnce.should.equal(true);
        sounds.play.getCall(0).args[0].should.equal('test');
    })
});