const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const IO = require('socket.io-client');

chai.use(chaiHttp);
chai.should();

describe('Server', ()=>{
    let agent, manager, display;
    before(()=>{
        agent = chai.request.agent(server);
    });
    beforeEach(async ()=>{
        display = await makeAsync(IO('http://localhost:'+agent.app.address().port+'/'));
        manager = await makeAsync(IO('http://localhost:'+agent.app.address().port+'/'));

    });
    afterEach(async ()=>{
        display.close();
        manager.close();
    });
    after(async ()=>{
        await async(cb=>agent.app.close(cb));
    });

    it('register as manager', async ()=>{
        const ret = await manager.asyncEmit('init', {role: 'manager'});
        ret.status.should.equal('ok');
    });

    it('register as display', async ()=>{
        const ret = await display.asyncEmit('init', {role: 'display'});
        ret.status.should.equal('ok');
    });

    it('should forward messages', async ()=>{
        await display.asyncEmit('init', {role: 'display'});
        await manager.asyncEmit('init', {role: 'manager'});
        manager.emit('message', {target: 'display', cmd: 'play', sound: 'loose'});
        const msg = await display.asyncOnce('message');
        msg.should.have.property('cmd', 'play');
        msg.should.have.property('sound', 'loose');
    });

    it('should forward messages opposite direction', async ()=>{
        await display.asyncEmit('init', {role: 'display'});
        await manager.asyncEmit('init', {role: 'manager'});
        display.emit('message', {target: 'manager', cmd: 'play', sound: 'loose'});
        const msg = await manager.asyncOnce('message');
        msg.should.have.property('cmd', 'play');
        msg.should.have.property('sound', 'loose');
    });
});

function async(fn){
    return new Promise(ok=>fn(()=>ok()));
}

function makeAsync(io){
    return new Promise(ok=> {

        io.asyncEmit = function () {
            const args = Array.prototype.slice.call(arguments);
            return new Promise(cb => this.emit.apply(io, [...args, (ret)=>cb(ret)]));
        };

        io.asyncOnce = function () {
            const args = Array.prototype.slice.call(arguments);
            return new Promise(cb => this.once.apply(io, [...args, (ret)=>cb(ret)]));
        };

        io.once('connect', ()=>{
            ok(io);
        });
    })
}