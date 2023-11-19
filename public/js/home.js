$(".user-card").on("click", async function(e) {
    e.preventDefault();
    if (e.target.getAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        $(location).attr('href', `/user/${id}`);
    }
});
