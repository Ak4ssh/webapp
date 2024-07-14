let queuedSongs = [];
let isPaused = false;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    } else {
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}


function changeSong(data) {
    console.log('Changing song to:', data);
    player.pause()

    // Remove the first song from the queue
    queuedSongs.shift();
    updateQueueList();

    if (data === 'None') {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-container').style.display = 'none';
        document.getElementById('no-song').style.display = 'flex';
        return;
    }

    document.getElementById('loader').style.display = 'flex';
    document.getElementById('no-song').style.display = 'none';
    document.getElementById('main-container').style.display = 'none';

    const videoid = data['videoid']
    const title = data['title']
    const file_url = 'https://music.techzbots.co/stream/' + data['file_name'];
    isPaused = data['paused']

    time_elapsed = data['time_elapsed'];
    response_time = data['response_time'];

    // Change the song data on the page
    document.getElementById('song-title').innerHTML = title;

    const imageUrl = `https://music.techzbots.co/yt_img/${videoid}/max`;
    document.getElementById('bg-image').src = imageUrl

    const style = document.createElement('style');
    style.innerHTML = `
.overlay-img:after {
    background: url('${imageUrl}') no-repeat center/cover;
}
    .bg-container{
    background: linear-gradient(to bottom, transparent 0%, var(--background-color) 100%), url('${imageUrl}') no-repeat center/cover;`
    document.head.appendChild(style);

    // Set the audio element source
    player.source = {
        type: 'audio',
        sources: [
            {
                src: file_url
            }
        ],
    };
    player.play();

    onPosterLoad()

}

function onPosterLoad() {
    console.log('Poster loaded');
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';

    let rect = document.getElementById('overlay-img').getBoundingClientRect();
    document.getElementById('song-details').style.top = `${rect.bottom + 40}px`;

    rect = document.getElementById('song-details').getBoundingClientRect();
    document.getElementById('queue-div').style.top = `${rect.bottom + 40}px`;
}



function updateQueueList() {
    if (queuedSongs.length === 0) {
        document.getElementById('queue-div').style.display = 'none';
        console.log('Queue is empty');
        return;
    }
    console.log('Updating queue:', queuedSongs);
    let html = ''

    for (let i = 0; i < queuedSongs.length; i++) {
        const song = queuedSongs[i];
        const title = song['title'];
        const duration = formatTime(song['duration']);
        const videoid = song['videoid'];

        html += `<div class="song-item">
        <div class="song-img" style="background: url('https://music.techzbots.co/yt_img/${videoid}/min') no-repeat center/cover;">
        </div>
        <div class="queue-name">
        <p>${title}</p>
        <p class="time-p">${duration}</p>
        </div>
        </div>`
    }

    document.getElementById('song-list').innerHTML = html;
    document.getElementById('queue-div').style.display = 'flex';
}