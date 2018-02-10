import {
    COMPETITOR_ADD_POINTS,
    COMPETITOR_CHANGE_NAME,
    COMPETITOR_CREATE,
    COMPETITOR_GIVE_CHANCE,
    COMPETITOR_REMOVE,
    COMPETITOR_RESET,
    COMPETITOR_TAKE_CHANCE
} from '../actions/competitors';


const player = (state, action)=>{
    const ret = {...state};
    switch(action.type){
        case COMPETITOR_RESET:
            ret.score = 0;
            ret.chances = 3;
            break;
        case COMPETITOR_GIVE_CHANCE:
            if(ret.chances >= 3) break;
            ret.chances += 1;
            break;
        case COMPETITOR_TAKE_CHANCE:
            if(ret.chances <= 0) break;
            ret.chances -= 1;
            break;
        case COMPETITOR_ADD_POINTS:
            ret.score += action.points;
            if(ret.score < 0) ret.score = 0;
            break;
        case COMPETITOR_CHANGE_NAME:
            ret.name = action.name;
            break;
    }
    return ret;
};


module.exports = (state, action)=>{
    const ret = {...state};
    switch(action.type){
        case COMPETITOR_CREATE:
            const id = ret.nextId = ret.nextId || 1;
            ret.nextId++;
            ret.players = {...state.players};
            ret.players[id] = {
                photo: action.photo,
                name: action.name,
                score:0,
                chances: 3
            };
            break;
        case COMPETITOR_REMOVE:
            ret.players = {...state.players};
            delete ret.players[action.playerId];
            break;
        case COMPETITOR_RESET:
        case COMPETITOR_GIVE_CHANCE:
        case COMPETITOR_TAKE_CHANCE:
        case COMPETITOR_ADD_POINTS:
        case COMPETITOR_CHANGE_NAME:
            ret.players = {...state.players};
            if(typeof ret.players[action.playerId] !== 'object') break;
            ret.players[action.playerId] = {...state.players[action.playerId]};
            ret.players[action.playerId] = player(ret.players[action.playerId], action);
            break;
    }
    return ret;
};