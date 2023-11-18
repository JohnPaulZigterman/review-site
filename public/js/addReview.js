$('#songReviewForm').submit(async function(event) {
    event.preventDefault();

    const song_id = $('#songName').val().trim();
    const title = $('#songReviewTitle').val().trim();
    const review = $('#songReview').val().trim();
    
    if (song_id && title && review) { 
        const response = await fetch('/api/songreviews', {
            method: 'POST',
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

$('#albumReviewForm').submit(async function(event) {
    event.preventDefault();

    const album_id = $('#albumName').val().trim();
    const title = $('#albumReviewTitle').val().trim();
    const review = $('#albumReview').val().trim();
    
    if (album_id && title && review) { 
        const response = await fetch('/api/albumreviews', {
            method: 'POST',
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



    
    

  