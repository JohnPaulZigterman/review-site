$('#songReviewForm').submit(async function(event) {
    event.preventDefault();

    const song_id = $('#songTitle').val().trim();
    const title = $('#songReviewTitle').val().trim();
    const review = $('#songReview').val().trim();
    
    if (songTitle && title && review) { 
        const response = await fetch('/api/song', {
            method: 'POST',
            body: JSON.stringify({ song_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            $(location).attr('href', '/addReview');
        } else {
            alert(response.statusText);
        }
    }
});

$('#albumReviewForm').submit(async function(event) {
    event.preventDefault();

    const album_id = $('#albumTitle').val().trim();
    const title = $('#albumReviewTitle').val().trim();
    const review = $('#albumReview').val().trim();
    
    if (albumTitle && title && review) { 
        const response = await fetch('/api/album', {
            method: 'POST',
            body: JSON.stringify({ album_id, title, review }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            $(location).attr('href', '/addReview');
        } else {
            alert(response.statusText);
        }
    }
});



    
    

  