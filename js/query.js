const asideNav = document.querySelector('.aside-nav');
const replyBtn = document.querySelector('.replyBtn');


const renderQueries = async (e) => {
    e.preventDefault;
    let uri = '/query/api';

    const res = await fetch(uri);
    const posts = await res.json();

    let template ='';
    posts.forEach(post => {
    template += `
       <div class="query">
          <div class="left">
              <h4>${post.email}</h4>
              <div class="inquiry">
                <p>${post.message}</p>
              </div>
          </div>
          <div class="right">
            <textarea name="Reply" placeholder="Reply" id="reply" cols="30" rows="10"></textarea>
            <div class="Btn"><button id="replyBtn" ><p>Send</p></button></div>
          </div>
          <div class="delete"><i class="fa fa-trash"></i></div>
       </div>
       `
    });
   asideNav.innerHTML = template;
};


document.addEventListener("DOMContentLoaded", renderQueries)