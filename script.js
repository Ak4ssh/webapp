let time_elapsed = 0;
let response_time = 0;
let player

function InitWebsite(user_id, group_id) {
    player = new Plyr('#player', {
        controls: [
            'progress', // The progress bar and scrubber for playback and buffering
        ],
        autoplay: true,
    });

    player.on('timeupdate', () => {
        const currentTime = player.currentTime;
        document.getElementById('current-time').innerHTML = formatTime(currentTime);
    });


    player.on('loadedmetadata', () => {
        const totalTime = player.duration;
        document.getElementById('total-time').innerHTML = formatTime(totalTime);

        const time_spent_on_response = new Date().getTime() - response_time; // in milliseconds
        player.currentTime = time_elapsed + time_spent_on_response / 1000;

        onPosterLoad()
    });
    
    player.on('playing',()=> {
        if (isPaused === true) {
            player.pause()
        }
        onPosterLoad()
    })

    initSocket(user_id, group_id);
}