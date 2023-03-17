
    const loginName = document.getElementById("loginName");
    const loginPass = document.getElementById("loginPass");
    const loginBtn = document.getElementById("loginBtn");
    const loginGgl = document.getElementById("loginGgl");

    const emailError = document.querySelector(".emailErr");
    const passwordError = document.querySelector(".passErr");

    async function createUser () {
    
        let nameUpVal = signupName.value.trim();
        let passUpVal = confirmPass.value.trim();
        
        const doc = {
            name: nameUpVal,
            password: passUpVal,
        };
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers:{ 'content-type': 'application/json' }
        });
    };

function checkUser() {
    let nameUpVal = signupName.value.trim();
    let passUpVal = signupPass.value.trim();
    let confUp = confirmPass.value.trim();
    let nameUp = nameUpVal.length;
    let passUp = passUpVal.length;
    
    if (nameUp === 0) {
        alert("Please enter your User name!")
    } else if (passUp === 0) {
        alert ("Password cannot be empty!")
    } else if (passUp < 4) {
        alert("Your password has less than four characters!")
    } else if (confUp.length ===0) {
        alert ("Confirm your password please!")
    } else if (passUpVal != confUp) {
        alert("The confirmed password is different to the initial one!")
    } else {
        alert("Sign Up Successful; you are welocme!");
        localStorage.setItem('userEmail', nameUpVal);
        localStorage.setItem('userPwd', passUpVal);
        createUser();
    }
};

//signupBtn.addEventListener('click', checkUser);



function checkInner() {
    let nameInVal = loginName.value.trim();
    let passInVal = loginPass.value.trim();
    let nameIn = nameInVal.length;
    let passIn = passInVal.length;
    var getEmail = localStorage.getItem('userEmail');
    var getPwd = localStorage.getItem('userPwd');
    if (nameIn === 0) {
        alert("Please enter your user name!")
    } else if (passIn === 0) {
        alert("Please enter your password!")
    } else if (nameInVal !== getEmail) {
        alert("User doesn't exist?");
    } else if (nameInVal === getEmail && passInVal !== getPwd) {
        alert("Wrong password");
    } else {
        alert("Login successful; you are welcome!");
    }
}

//loginBtn.addEventListener('click', checkInner );
 


//signupGgl.addEventListener('click', createUser);


 
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    //get values
    let email = loginName.value.trim();
    let password = loginPass.value.trim();
  
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
        if (data.user) {
            alert("login was successful; you are welcome!");
            location.assign('/')
        }

    } catch (err) {
        console.log(err);
    }
});
