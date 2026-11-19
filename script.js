console.log("Let\'s write JavaScript codes.");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let response = await a.text();
    // console.log(response);
    
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(as);

    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/").pop());
        }
    }
    return songs;
}

async function main() {
    // display list of songs
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]; 
    for (const song of songs) {
        let songName = song.replaceAll("%20", " ");
        songName = songName.substring(0, songName.length - 4); // remove .mp3 extension
        songUL.innerHTML += `<li>${songName}</li>`; 
    }


    // Play songs
    var audio = new Audio("Songs/" + songs[0]);

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration; // duration in seconds
        console.log(duration);
    });

    let play = document.querySelector(".play");
    play.addEventListener("click", () => {
        audio.play();
    });
}

main();