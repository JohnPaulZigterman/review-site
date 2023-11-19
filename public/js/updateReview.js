$("#update-song-rev-button").on("click", async function(event) {
    event.preventDefault();
    const song_id = $('#songName').val().trim();
    const title = $('#songReviewTitle').val().trim();
    const review = $('#songReview').val().trim();
    const id = $(this).attr("data-id");

    if (song_id && title && review) {
        const response = await fetch('/api/songreviews/' + id, {
            method: 'PUT',
            body: JSON.stringify({ song_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/dash');
        } else {
            alert(response.statusText);
        }
    }
});

$("#update-album-rev-button").on("click", async function(event) {
    event.preventDefault();
    const album_id = $('#albumName').val().trim();
    const title = $('#albumReviewTitle').val().trim();
    const review = $('#albumReview').val().trim();
    const id = $(this).attr("data-id");

    if (album_id && title && review) {
        const response = await fetch('/api/albumreviews/' + id, {
            method: 'PUT',
            body: JSON.stringify({ album_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/dash');
        } else {
            alert(response.statusText);
        }
    }
});