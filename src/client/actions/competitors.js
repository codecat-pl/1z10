export const COMPETITOR_ADD_POINTS = 'COMPETITOR_ADD_POINTS';
export const COMPETITOR_TAKE_CHANCE = 'COMPETITOR_TAKE_CHANCE';
export const COMPETITOR_GIVE_CHANCE = 'COMPETITOR_GIVE_CHANCE';
export const COMPETITOR_RESET = 'COMPETITOR_RESET';
export const COMPETITOR_REMOVE = 'COMPETITOR_REMOVE';
export const COMPETITOR_CREATE = 'COMPETITOR_CREATE';
export const COMPETITOR_CHANGE_NAME = 'COMPETITOR_CHANGE_NAME';

export const addPoints = (playerId, points=1)=>{
    return {type: COMPETITOR_ADD_POINTS, playerId, points};
};

export const takeChance = (playerId)=>{
    return {type: COMPETITOR_TAKE_CHANCE, playerId};
};

export const giveChance = (playerId)=>{
    return {type: COMPETITOR_GIVE_CHANCE, playerId};
};

export const changeName = (playerId, name)=>{
    return {type: COMPETITOR_CHANGE_NAME, playerId, name};
};

export const reset = (playerId)=>{
    return {type: COMPETITOR_RESET, playerId};
};

export const remove = (playerId)=>{
    return {type: COMPETITOR_REMOVE, playerId};
};

export const create = (name, photo)=>{
    return {type: COMPETITOR_CREATE, photo, name};
};