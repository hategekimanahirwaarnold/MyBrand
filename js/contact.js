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
       try {
            const res=  await fetch('/query/api', {
                method: 'POST',
                body: JSON.stringify(doc),
                headers:{ 'content-type': 'application/json' }
            });
            const data = await res.json();
            if(data.errors) {
                console.log('there are some errors in your email');
            } else {
                alert("Your message was succussfully sent; thank you for reaching on us!");
                location.reload();
            }
       } catch (error) {
           alert('Please write a valid email!');
       }
    }
};
submitBtn.addEventListener('click', submitQuery)