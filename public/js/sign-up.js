const signUpForm = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const email = document.querySelector("#email").value.trim();
    
    if (name && password && email) {
        const response = await fetch("/api/users/sign-up", {
        method: "POST",
        body: JSON.stringify({ name, password, email }),
        headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
        document.location.replace("/dash");
        console.log("User created");
        } else {
        alert("Failed to sign up.");
        }
    }
};

document
    .querySelector("#sign-up-form")
    .addEventListener("submit", signUpForm);
    