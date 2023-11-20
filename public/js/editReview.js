$(".albumReviewForm").on("submit", async function (event) {
    event.preventDefault();

    const title = $(".albumReviewTitle").val().trim();
    const review = $(".albumReviewContent").val().trim();
    const id = $(this).data("id");
    const reviewData = {
        title,
        review
    };

    const response = await fetch(`/api/albumreviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(reviewData),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        $(location).attr("href", "/dash");
        console.log("Review updated");
    }
});

$(".songReviewForm").on("submit", async function (event) {
    event.preventDefault();

    const title = $(".songReviewTitle").val().trim();
    const review = $(".songReviewContent").val().trim();
    const id = $(this).data("id");
    const reviewData = {
        title,
        review
    };

    const response = await fetch(`/api/songreviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(reviewData),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        $(location).attr("href", "/dash");
        console.log("Review updated");
    }
});


