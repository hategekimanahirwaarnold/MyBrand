const trash = document.getElementsByName("delete");
var numTrash = trash.length;

console.log(numTrash);

trash[0].addEventListener('click', (e) => {
    const endpoint= `/blogs/${trash.dataset.doc}`;

    fetch(endpoint, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => { console.log(err)
    })
});
console.log('hey youj')