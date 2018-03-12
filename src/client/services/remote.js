
export default function Remote(io, bus){
    io.emit('init', {role: 'display'});

    io.on('message',async (payload, cb)=>{
        console.log(payload);
        const ret = await bus.act({direction: 'in', ...payload});
        cb && cb(ret);
    });

    bus.add({direction: 'out', target: /.*/},msg=>{
        return new Promise(ok=>io.emit('message',msg, ok));
    });
}
