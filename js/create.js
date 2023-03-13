// javascript for create.html
const form = document.querySelector('.artcl');
const title = document.querySelector('.ttl');
const submitBtn = document.querySelector('.submit-btn');
const articles = document.querySelector('.articles');
const comments = document.querySelector('.comments');

    const createPost = async (e) => {
        e.preventDefault();
        
        const doc = {
            header: title.value,
            body: form.value,
            cycle: "cycle",
            likes: 0
        };
        await fetch('http://localhost:3000/pots', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers:{ 'content-type': 'application/json' }
        });
    };
    const renderPosts = async (e) => {
        e.preventDefault;
        let uri = 'http://localhost:3000/pots';
    
        const res = await fetch(uri);
        const posts = await res.json();
    
        let template ='';
        posts.forEach(post => {
        template += `
        <div class="btn">
            <button ><p> ${post.header} </p></button>
            <i class="fa fa-pencil"></i>
            <i onClick="deleteBlog()" id="${post.id}" class="fa fa-trash"></i>
        </div>
           `
        });
       articles.innerHTML = template;
       renderComments();
    };

    async function renderComments () {
        let uri = 'http://localhost:3000/comments';
    
        const res = await fetch(uri);
        const posts = await res.json();
    
        let template ='';
        posts.forEach(post => {
        template += `
            <div class="commenter">
                <h4>${post.name}</h4>
                <i class="fa fa-trash"></i>
            </div>
            <details>${post.comment}</details>
           `
        });
       comments.innerHTML = template;
    };


 submitBtn.addEventListener('click',createPost);

 document.addEventListener("DOMContentLoaded", renderPosts)



function addBlog(e) {
    e.preventDefault;
    console.log("byakunze");
    const div = document.createElement('div')
    div.classList = 'btn'
    div.innerHTML = `
        <button><p> ${title.value} </p></button>
        <i class="fa fa-pencil"></i>
        <i class="fa fa-trash"></i>
    `
    let ideas = form.value.trim().length;
    if (ideas !== 0) {
      console.log (ideas);
    } else {
      console.log ("there is no idea");
      div.innerHTML= ``;
    };
  
    articles.insertAdjacentElement('beforeend', div);
  };

  async function deleteBlog (post) {
    let uri = await fetch('http://localhost:3000/pots/');
    const posts = await uri.json();
    console.log(post);
 //   posts.forEach(post =>{
 //      console.log (post.body);
 //   })
    }
