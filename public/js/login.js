async function loginFormHandler(e) {
    e.preventDefault();
    const name = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && password) {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                name,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            document.location.replace('/');
            alert('good!')
        } else {
            alert(res.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', loginFormHandler);

