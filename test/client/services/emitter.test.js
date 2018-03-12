

import Emitter from '../../../src/common/message_bus';
import chai from 'chai';
import sinon from 'sinon';
const should = chai.should();




describe('Emitter', ()=>{
    let emitter;
    beforeEach(async ()=>{
        emitter = new Emitter();
    });

    it('should match property', done=>{
        emitter.add({direction: 'out'}, msg=>done());
        emitter.act({direction: 'out', target:'manager', payload: 'test'});
    });

    it('should match patterns', ()=>{
        const spy = sinon.spy();
        emitter.add({direction: 'out', asd: true}, ()=>spy());
        emitter.add({direction: 'out'}, ()=>spy());
        emitter.act({direction: 'out', target:'manager', payload: 'oko'});
        spy.calledOnce.should.equal(true);
    });

    it('should match patterns with regex', ()=>{
        const ok = sinon.spy();
        const fail = sinon.spy();
        emitter.add({direction: 'out', target: /^n.*/ }, ()=>fail());
        emitter.add({direction: 'out', target: /^m.*/}, ()=>ok());
        emitter.act({direction: 'out', target:'manager', payload: 'oko'});
        fail.callCount.should.equal(0);
        ok.calledOnce.should.equal(true);
    });

});
