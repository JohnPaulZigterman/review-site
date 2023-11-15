var userBtn = document.querySelector('#user-btn');
var userContainer = document.querySelector('#user-container');

userBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const innerHTML = `
    <p>{{user.albumsReview}}</p>
    <p>{{user.songReview}}</p>
    `;
    userContainer.append(innerHTML);
});

    
