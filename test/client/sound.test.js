//require("mocha-as-promised")();
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();

const Sound = require('../../src/client/sound');


describe('Sound', ()=>{

    it('should have audio factory method', ()=>{
        class Audio{
            constructor(name){
                Audio.instances++;
                Audio.lastParam = name;
            }
        }
        Audio.instances = 0;
        Audio.lastParam = null;

        global.Audio = Audio;
        const audio = Sound.createAudio('test.wav');
        audio.should.be.instanceOf(Audio);
        Audio.instances.should.equal(1);
        Audio.lastParam.should.equal('test.wav');

    });

    it('should create audio', ()=>{
        Sound.createAudio = sinon.stub().returns(null);
        const sound = new Sound({win: 'win.wav'});
        Sound.createAudio.withArgs('win.wav').calledOnce.should.be.true;
    });

    it('should create audio for every sound', ()=>{
        Sound.createAudio = sinon.stub().returns(null);
        const sound = new Sound({win: 'win.wav', loose: 'loose.wav'});
        Sound.createAudio.withArgs('win.wav').calledOnce.should.be.true;
        Sound.createAudio.withArgs('loose.wav').calledOnce.should.be.true;
    })

    it('should play', ()=>{
        const fake = {
            play: sinon.spy(),
            pause: sinon.spy(),
            currentTime: 100
        };
        Sound.createAudio = sinon.stub().returns(fake);
        const sound = new Sound({win: 'win.wav'});
        sound.play('win');
        Sound.createAudio.calledOnce.should.be.true;
        fake.currentTime.should.equal(0);
        fake.pause.calledOnce.should.be.true;
        fake.play.calledOnce.should.be.true;
    })
});
