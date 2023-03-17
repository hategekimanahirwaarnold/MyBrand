const signupName = document.getElementById("signupName");
const signupPass = document.getElementById("signupPass");
const confirmPass = document.getElementById("confirmPass");
const signupBtn = document.getElementById("signupBtn");
const signupGgl = document.getElementById("signupGgl");
const emailError = document.querySelector(".emailErr");
const passwordError = document.querySelector(".passErr");



signupBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    //get values
    let email = signupName.value.trim();
    let password = signupPass.value.trim();
    let confUp = confirmPass.value.trim();
    
    if (password != confUp) {
        alert("The confirmed password is different to the initial one!")
    } else {
        console.log(email, password);

        try {
            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password}),
                headers: { 'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            }
            if (data.user) {
                alert("Sign up was successful; you are welcome!");
                location.assign('/')
            }

            
            // console.log(res);

            // if (res.ok) {
            //     const data = await res.json();
            //     console.log(data);
            // } else {
            //     console.log('There was an error with the request');
            // }

        } catch (err) {
            console.log(err);
        }
    }
});
