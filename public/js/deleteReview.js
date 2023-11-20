$(".SongReviewDelete").on("click", async function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch('/api/songreviews/' + id, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            $(location).attr('href', '/dash');
        } else {
            alert(response.statusText);
        }
    }
});

$(".AlbumReviewDelete").on("click", async function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
        const response = await fetch('/api/albumreviews/' + id, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            $(location).attr('href', '/dash');
        } else {
            console.log(response.statusText);
        }
    }
});