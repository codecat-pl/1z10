import Blumrun from 'bloomrun';

export default class Emitter{
    constructor(){
        this.bloomrun = Blumrun();
    }

    add(pattern, handler){
        this.bloomrun.add(pattern, handler);
    }

    act(msg){
        const handler = this.bloomrun.lookup(msg);
        if(handler) return Promise.resolve(handler(msg));
        else return Promise.resolve(null);
    }
}