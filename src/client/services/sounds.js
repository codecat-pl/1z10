


export default (events, sounds) => {
    events.add({cmd: 'play_sound'}, msg=>{
        sounds.play(msg.sound);
    })
}