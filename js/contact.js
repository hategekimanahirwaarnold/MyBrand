const contEmail = document.querySelector('.contactEmail');
const query = document.querySelector('.query');
const submitBtn = document.getElementById("submitBtn");


const submitQuery = async (e) => {
    e.preventDefault();
    
    const doc = {
        email: contEmail.value,
        message: query.value,
    };
    await fetch('http://localhost:3000/queries', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers:{ 'content-type': 'application/json' }
    });
};
submitBtn.addEventListener('click', submitQuery)