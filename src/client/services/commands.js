import * as actions from '../actions/competitors';

export default (events, store) =>{
    events.add({cmd: 'add_points', player: /.*/}, msg=>{
        store.dispatch(actions.addPoints(msg.player, msg.points || 1))
    });

    events.add({cmd: 'give_chance', player: /.*/}, msg=>{
        store.dispatch(actions.giveChance(msg.player))
    });

    events.add({cmd: 'take_chance', player: /.*/}, msg=>{
        store.dispatch(actions.takeChance(msg.player))
    });

    events.add({cmd: 'sync'}, msg=>{
        store.dispatch(actions.replaceState(msg.player))
    });
}