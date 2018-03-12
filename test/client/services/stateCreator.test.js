
import createState from '../../../src/client/services/state_creator';
import sinon from 'sinon';
import chai from 'chai';
const should = chai.should();


describe('State Creator', ()=>{
    const onePlayerConfig = {
        players: [
            {name: "Jan", photo: 'asd.png'}
        ]
    };

    const twoPlayerConfig = {
        players: [
            {name: "Jan", photo: 'asd.png'},
            {name: "Malgosia", photo: 'qwe.png'},
        ]
    };

    it('should create nextId', ()=>{
        const state = createState();
        state.competitors.should.have.property('nextId', 1);
    });
    it('should create players object', ()=>{
        const state = createState();
        state.competitors.should.have.property('players');
        state.competitors.players.should.be.an('object');
    });

    it('should create players with ids from 1', ()=>{
        const state = createState(twoPlayerConfig);
        state.competitors.players.should.not.have.property("0");
        state.competitors.players.should.have.property("1");
        state.competitors.players.should.have.property("2");
        state.competitors.players.should.not.have.property("3");
    });

    it('should create player with name', ()=>{
        const state = createState(onePlayerConfig);
        state.competitors.players["1"].should.have.property("name","Jan");
    });

    it('should create player with photo', ()=>{
        const state = createState(onePlayerConfig);
        state.competitors.players["1"].should.have.property("photo","asd.png");
    });

    it('should create player with score', ()=>{
        const state = createState(onePlayerConfig);
        state.competitors.players["1"].should.have.property("score",0);
    });

    it('should create player with chances', ()=>{
        const state = createState(onePlayerConfig);
        state.competitors.players["1"].should.have.property("chances",3);
    });
});