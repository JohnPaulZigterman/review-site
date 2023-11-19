$(".SongReviewUpdate").on("click", async function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch('/api/songreviews/' + id, {
            method: 'GET'
        });

        if (response.ok) {
            $(location).attr('href', '/edit-song-rev/' + id);
        } else {
            alert(response.statusText);
        }
    }
});

$(".AlbumReviewUpdate").on("click", async function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch('/api/albumreviews/' + id, {
            method: 'GET'
        });

        if (response.ok) {
            $(location).attr('href', '/edit-album-rev/' + id);
        } else {
            alert(response.statusText);
        }
    }
});