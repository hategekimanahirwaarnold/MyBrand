const contEmail = document.querySelector('.contactEmail');
const query = document.querySelector('.query');
const submitBtn = document.getElementById("submitBtn");


const submitQuery = async (e) => {
    e.preventDefault();
    
    const doc = {
        email: contEmail.value,
        message: query.value,
    };
    if (query.value == "") {
        alert("Please write your message before sending!")
    } else {
        await fetch('/query/api', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers:{ 'content-type': 'application/json' }
        });
        alert("Your message was succussfully sent; thank you for reaching on us!");
        location.reload();
    }
};
submitBtn.addEventListener('click', submitQuery)