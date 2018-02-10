module.exports = class Sound {
    static createAudio(file){
        return new Audio(file);
    }

    constructor(sounds){
        this._sounds = {};
        Object.keys(sounds).forEach(name=>{
            this._sounds[name] = this.constructor.createAudio(sounds[name]);
        })
    }

    play(name){
        this._sounds[name].pause();
        this._sounds[name].currentTime = 0;
        this._sounds[name].play();
    }
};