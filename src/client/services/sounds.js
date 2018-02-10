
export default function createSoundObserver (store, sounds) {
    let prevState = store.getState();

    return store.subscribe(() => {
        const nextState = store.getState();

        Object.keys(nextState.players).forEach(player=>{
            const prev = prevState.players[player];
            const next = nextState.players[player];
            if(prev && next){
                if(prev.chances > next.chances) {
                    if (next.chances == 0) {
                        sounds.play('loose_all');
                    } else {
                        sounds.play('loose');
                    }
                }
                if(prev.score < next.score){
                    sounds.play('win');
                }
            }
        });

        prevState = nextState
    })
}
