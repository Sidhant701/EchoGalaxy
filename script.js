console.log("Let\'s write JavaScript codes.");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
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
            songs.push(element.href);
        }
    }
    return songs;
}

async function main() {
    // display list of songs
    let songs = await getSongs();
    console.log(songs);

    // Play songs
    var audio = new Audio(songs[0]);

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