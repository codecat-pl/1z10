
export default (config={})=>{
    const ret = {};
    let maxIdx = 0;
    if(config.players && Array.isArray(config.players)) {
        config.players.forEach(( player, idx ) => {
            ret[idx + 1] = {...player};
            ret[idx + 1].score = 0;
            ret[idx + 1].chances = 3;
            maxIdx = idx + 1;
        });
    }
    return {
        nextId: maxIdx+1,
        players: ret
    }
}