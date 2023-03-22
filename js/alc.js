const inTable = document.querySelector("#intbl");


const renderUsers = async (e) => {
    e.preventDefault;
    let uri = '/users';

    const res = await fetch(uri);
    const posts = await res.json();

    let template ='';
    posts.forEach(post => {
    template += `
    
    <tr>
      <td>${post.id}</td>
      <td>${post.email}</td>
      <td>${post.password}</td>
      <td><i class="fa fa-trash"></i></td>
    </tr>
       `
    });
   inTable.innerHTML = template;
   renderComments();
};


document.addEventListener("DOMContentLoaded", renderUsers)