
import { createStore } from 'redux'
import reducer from '../../../src/client/reducers/index';
import Connector from '../../../src/client/services/remote';
import Emitter from '../../../src/common/message_bus';
import sinon from 'sinon';
import * as actions from '../../../src/client/actions/competitors';
import chai from 'chai';
const should = chai.should();
import IOServer from 'socket.io';
import IOClient from 'socket.io-client';
import http from 'http';
import {EventEmitter} from 'events';



describe('Connector', ()=>{
    let io, emitter;
    beforeEach(async ()=>{
        io = await setup();
        emitter = new Emitter();
    });

    afterEach(async ()=>{
        io.client.close();
        await async(cb=>io.server.close(cb));
    });

    it('should send messages with direction out and target to server', done=>{
        Connector(io.client, emitter);
        io.socket.on('message', msg=>{
            console.log("dupa", msg);
            done();
        });
        emitter.act({direction: 'out', target:'manager', payload: 'test'});
    });

    it('should send messages with direction out and target to server', ok=>{
        io.socket.on('init', msg=>{
            msg.should.have.property('role', 'display');
            ok();
        });
        Connector(io.client, emitter);
    });

    it('should tag messages from server with "in" direction and push to emitter', done=>{
        Connector(io.client, emitter);
        emitter.add({direction: 'in'}, msg=>{
            try {
                msg.should.have.property('payload', 'test');
                done();
            }catch(err){
                done(err);
            }
        });
        io.socket.emit('message', {payload: 'test'})
    })


});


function async(fn){
    return new Promise(ok=>fn(()=>ok()));
}




function setup(){
    return Promise.all([(async ()=>{
        const server = IOServer(4321);
        let socket;
        await async(cb=>{
            server.on('connection', sock=>{
                socket = sock;
                cb();
            })
        });
        return {server, socket};
    })(),(async ()=>{
        const io = IOClient('http://localhost:4321/');
        await async(cb=>io.on('connect', cb));
        return io;
    })()]).then(ret=>{
        return {
            server: ret[0].server,
            socket: ret[0].socket,
            client: ret[1]
        }
    });
}