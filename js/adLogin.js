
const adName = document.querySelector(".adName");
const adPass = document.querySelector(".adPass");
const adBtn = document.querySelector(".adBtn");
const adLoginGgl = document.getElementById("adLoginGgl");

const emailError = document.querySelector(".emailErr");
const passwordError = document.querySelector(".passErr");



adBtn.addEventListener('click', async (e) => {
e.preventDefault();
// reset errors
 emailError.textContent = '';
 passwordError.textContent = '';

//get values
let email = adName.value.trim();
let password = adPass.value.trim();

try {
    const res = await fetch('/adLogin', {
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
    if (data.admin) {
        alert("login was successful; you are welcome!");
        location.assign('/create')
    }

} catch (err) {
    console.log(err);
}
});
