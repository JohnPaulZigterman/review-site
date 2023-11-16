$(".SongReviewUpdate").on("click", function(event) {
    event.preventDefault();
    const song_id = $('#songTitle').val().trim();
    const title = $('#songReviewTitle').val().trim();
    const review = $('#songReview').val().trim();
    const id = $(this).attr("data-id");

    if (song_id && title && review) {
        const response = fetch('/api/songReview/' + id, {
            method: 'PUT',
            body: JSON.stringify({ song_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/updateReview');
        } else {
            alert(response.statusText);
        }
    }
});

$(".AlbumReviewUpdate").on("click", function(event) {
    event.preventDefault();
    const album_id = $('#albumTitle').val().trim();
    const title = $('#albumReviewTitle').val().trim();
    const review = $('#albumReview').val().trim();
    const id = $(this).attr("data-id");

    if (album_id && title && review) {
        const response = fetch('/api/albumReview/' + id, {
            method: 'PUT',
            body: JSON.stringify({ album_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/updateReview');
        } else {
            alert(response.statusText);
        }
    }
});