$("#loginForm").submit(function(event) {
    event.preventDefault();
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (email && password) {
        const response = fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/addReview');
        } else {
            alert(response.statusText);
        }
    }
});

$("#signupForm").submit(function(event) {
    event.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (email && password && name) {
        const response = fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $(location).attr('href', '/addReview');
        } else {
            alert(response.statusText);
        }
    }
});