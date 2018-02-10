export default {
    images: {
        default_competitor: "/assets/images/competitor_new.png"
    },
    sounds: {
        loose: "/assets/sounds/loose.wav",
        loose_all: "/assets/sounds/loose_all.wav",
        win: "/assets/sounds/win.wav",
        music: "/assets/sounds/music.wav"
    },
    players: Array(10).fill(1).map((v,idx)=>({
        name: "Osoba "+(idx+1),
        photo: `/assets/images/competitor_new.png`
    }))
}