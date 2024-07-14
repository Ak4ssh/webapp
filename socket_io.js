function initSocket(user_id, group_id) {
    const socket = io('https://music.techzbots.co', {
        path: '/ws/socket.io', query: { 'user_id': user_id, 'group_id': group_id }
    });

    socket.on('connect', () => {
        console.log('Connected to server');

    });

    socket.on('change_song', (data) => {
        changeSong(data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('add_to_queue', (data) => {
        for (let song of data) {
            queuedSongs.push(song);
        }
        updateQueueList();
    });

    socket.on('pause_song', () => {
        isPaused = true
        player.pause();
    });

    socket.on('resume_song', () => {
        isPaused = false
        player.play();
    });
}