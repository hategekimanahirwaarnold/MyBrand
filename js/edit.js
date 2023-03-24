const editBtn = document.querySelector('.submit-btn');
const title = document.querySelector('.ttl').value;
const date = document.getElementsByName("date").value;
const description = document.getElementsByName("description").value;
const image = document.getElementsByName("image").value;
const body = document.getElementsByName("body").value;

editBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let doc = {
        title: title,
        body: body,
        date: date,
        image: image,
        description: description,
    };

    await fetch(`/blogs/${editBtn.dataset.doc}`, {
        method: 'PATCH',
        body: JSON.stringify(doc),
        headers: { 'Content-Type':' application/json'}
    }); 
     window.location.replace('/manage');
})