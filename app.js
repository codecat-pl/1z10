const path = require('path');
const express = require('express');
const http = require('http');
const IO = require('socket.io');

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.Server(app);
const io = IO(server);

//require('./src/server/index.js')(app, io, mBus);

io.on('connection', socket=>{
    socket.once('init', (conf, ret)=>{
        socket.join(conf.role);
        ret && ret({status: 'ok'});
    });
    socket.on('message', msg=>{
        socket.broadcast.to(msg.target).emit('message', msg);
    });
});

app.use((req, res, next)=>{
    res.io = io;
    next();
});
app.use(express.static(path.join(__dirname, 'public/')));
app.use('/assets', express.static(path.join(__dirname, 'assets/')));

module.exports = server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});