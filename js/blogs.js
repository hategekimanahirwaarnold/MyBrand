
const container = document.querySelector('.blogs')

const renderPosts = async () => {
    let uri = 'http://localhost:3000/pots';

    const res = await fetch(uri);
    const posts = await res.json();

    let template ='';
    posts.forEach(post => {
    template += `
      <div class="post">
        <header>${post.header}</header>
        <div class="${post.cycle}"></div>
        <p class="p">${post.body.slice(0,200)}</p>
        <a href="/?id=${posts.id}">Read more...</a>
      </div>
       `
      console.log(posts);
    })

   container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderPosts());