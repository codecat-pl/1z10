const React = require('react');
const { mount, shallow } = require('enzyme');
const {expect} = require('chai');

const freeze = require('../helpers/freezer');

const Actions= require('../../../src/client/actions/competitors');
const reducer = require('../../../src/client/reducers/competitors');


describe('CompetitorReducers', ()=>{
    const Jas = { photo: 'jan.png', name: 'Jan', score: 3, chances: 1 };
    const Malgosia = { photo: 'malgosia.png', name: 'Malgosia', score: 2, chances: 3 };
    const BabaJaga = { photo: 'babajaga.png', name: 'BabaJaga', score: 1, chances: 0 };
    const gameState = {
        nextId: 4,
        players: {
            1: Jas,
            2: Malgosia,
            3: BabaJaga
        }
    };
    freeze(gameState);

    it('should return unchanged state if action is not handled',()=>{
        const newState = reducer(gameState, {type: 'NOT_EXISTING_ACTION'});
        expect(newState).to.eql(gameState);
    });

    describe('create', ()=>{
        it('should create competitor', ()=>{
            const newState = reducer(gameState, Actions.create('Jan', 'test.png'));
            expect(newState.players).to.be.an('object');
            expect(newState.players[4]).to.have.property('photo', 'test.png');
            expect(newState.players[4]).to.have.property('name', 'Jan');
            expect(newState.players[4]).to.have.property('score', 0);
            expect(newState.players[4]).to.have.property('chances', 3);
        });
        it('should create many competitors', ()=>{
            const state2 = reducer(gameState, Actions.create( 'Jan','test.png'));
            const newState = reducer(state2, Actions.create('Oko', 'test.png'));
            expect(newState.players[4]).to.have.property('name', 'Jan');
            expect(newState.players[5]).to.have.property('name', 'Oko');
        })
    });

    describe('remove', ()=> {
        it('should remove player', () => {
            const newState = reducer(gameState, Actions.remove(1));
            expect(newState.players).to.not.have.property('1');
        });

        it('should not remove if player not exist', () => {
            const newState = reducer(gameState, Actions.remove(10));
            expect(Object.keys(newState.players)).to.have.length(3);
        });
    });
    describe('reset', ()=>{
        it('should reset score to default value', ()=>{
            const newState = reducer(gameState, Actions.reset(1));
            expect(newState.players[1]).to.have.property('score', 0);
        });
        it('should reset chances to default value', ()=>{
            const newState = reducer(gameState, Actions.reset(1));
            expect(newState.players[1]).to.have.property('chances', 3);
        });
        it('should do nothing if player not exist', ()=>{
            const newState = reducer(gameState, Actions.reset(123));
            expect(newState.players).to.not.have.property('123');
        });
    });

    describe('giveChance',()=>{
        it('should add one chance to player', ()=>{
            const newState = reducer(gameState, Actions.giveChance(1));
            expect(newState.players[1]).to.have.property('chances', 2);
        });

        it('should not add chance if already have 3', ()=>{
            const newState = reducer(gameState, Actions.giveChance(2));
            expect(newState.players[2]).to.have.property('chances', 3);
        });
        it('should do nothing if player not exist', ()=>{
            const newState = reducer(gameState, Actions.giveChance(123));
            expect(newState.players).to.not.have.property('123');
        });
    });
    describe('takeChance',()=>{
        it('should take one chance from player', ()=>{
            const newState = reducer(gameState, Actions.takeChance(1));
            expect(newState.players[1]).to.have.property('chances', 0);
        });

        it('should not take chance if already have 0', ()=>{
            const newState = reducer(gameState, Actions.takeChance(3));
            expect(newState.players[3]).to.have.property('chances', 0);
        });
        it('should do nothing if player not exist', ()=>{
            const newState = reducer(gameState, Actions.takeChance(123));
            expect(newState.players).to.not.have.property('123');
        });
    });
    describe('addPoints',()=>{
        it('should add 1 point to players score', ()=>{
            const newState = reducer(gameState, Actions.addPoints(1, 1));
            expect(newState.players[1]).to.have.property('score', 4);
        });

        it('should add 10 points to players score', ()=>{
            const newState = reducer(gameState, Actions.addPoints(1, 10));
            expect(newState.players[1]).to.have.property('score', 13);
        });

        it('should add -1 point to players score', ()=>{
            const newState = reducer(gameState, Actions.addPoints(1, -1));
            expect(newState.players[1]).to.have.property('score', 2);
        });

        it('should add negative points but score can\'t be less than 0', ()=>{
            const newState = reducer(gameState, Actions.addPoints(1, -10));
            expect(newState.players[1]).to.have.property('score', 0);
        });

        it('should do nothing if player not exist', ()=>{
            const newState = reducer(gameState, Actions.addPoints(123, -10));
            expect(newState.players).to.not.have.property('123');
        });
    });

    describe('changeName',()=>{
        it('should change players name', ()=>{
            const newState = reducer(gameState, Actions.changeName(1, "Franek"));
            expect(newState.players[1]).to.have.property('name', 'Franek');
        });

    });
});