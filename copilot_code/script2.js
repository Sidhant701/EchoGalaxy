const tracks=[ {
    title: "Solar Echoes",
        artist: "Nova Drift",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
}

,
{
title: "Midnight Orbit",
    artist: "Luna Array",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
}

,
{
title: "Starlight Pulse",
    artist: "Cosmic Waves",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
}

];

const playlist=document.querySelector("#playlist");
const nowTitle=document.querySelector("#now-title");
const nowArtist=document.querySelector("#now-artist");
const playBtn=document.querySelector("#play-btn");
const progress=document.querySelector("#progress");
const audio=document.querySelector("#audio");

let selectedTrack=null;
let isPlaying=false;

function renderTracks() {
    playlist.innerHTML="";

    tracks.forEach((track, index)=> {
            const card=document.createElement("article");
            card.className="card";

            card.innerHTML=`<h3> ${
                track.title
            }

            </h3><p> ${
                track.artist
            }
            </p>`;
            card.addEventListener("click", ()=> selectTrack(index));
            playlist.appendChild(card);
        });
}

function selectTrack(index) {
    selectedTrack=tracks[index];
    audio.src=selectedTrack.src;
    nowTitle.textContent=selectedTrack.title;
    nowArtist.textContent=selectedTrack.artist;
    playBtn.disabled=false;
    progress.value=0;
    isPlaying=false;
    playBtn.textContent="Play";

    document.querySelectorAll(".card").forEach((card, cardIndex)=> {
            card.classList.toggle("active", cardIndex===index);
        });
}

playBtn.addEventListener("click", async () => {
    if (!selectedTrack) return;

    if (!isPlaying) {
        try {
            await audio.play();
            isPlaying = true;
            playBtn.textContent = "Pause";
        } catch (error) {
            console.error("Unable to play audio:", error);
        }
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "Play";
    }
});

audio.addEventListener("timeupdate", ()=> {
        if ( !audio.duration) return;
        progress.value=(audio.currentTime / audio.duration) * 100;
    });

progress.addEventListener("input", ()=> {
        if ( !audio.duration) return;
        audio.currentTime=(progress.value / 100) * audio.duration;
    });

audio.addEventListener("ended", ()=> {
        isPlaying=false;
        playBtn.textContent="Play";
        progress.value=0;
    });

renderTracks();