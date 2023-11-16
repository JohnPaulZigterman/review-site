$(".SongReviewDelete").on("click", function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = fetch('/api/albumReview/' + id, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            $(location).attr('href', '/deleteReview');
        } else {
            alert(response.statusText);
        }
    }
});

$(".AlbumReviewDelete").on("click", function(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = fetch('/api/albumReview/' + id, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            $(location).attr('href', '/deleteReview');
        } else {
            alert(response.statusText);
        }
    }
});