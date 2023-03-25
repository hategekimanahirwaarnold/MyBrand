let likebtn = document.querySelector('#likebtn');
let dislikebtn = document.querySelector('#dislikebtn');
let input1 = document.querySelector('#input-1');
let input2 = document.querySelector('#input-2');
const submitBtn = document.querySelector('.submit-btn');
const wrtnComment = document.querySelector('textarea');
const rightSide = document.querySelector('.right-side');
const body = document.querySelector('body');
const commentSection = document.querySelector('.commentSection');

const submitLike = async () => {

  try {
    const res = await fetch(`/blogs/${input1.dataset.doc}/likes`, {
      method: 'POST',
      headers:{ 'content-type': 'application/json' }
    });
    const data = await res.json();
    location.reload();
  } catch (err) {
    console.log(err);
    location.replace("/login");
  }

}
likebtn.addEventListener('click', submitLike);

const renderLikes = async() => {
    const res = await fetch(`/blogs/${input1.dataset.doc}/likes`);
    const like = await res.json();
    input1.value= like.likes.length
    if (input1.value > 0) {
      input1.style.color = "green";
      likebtn.style.color = "green";
    }
}
document.addEventListener("DOMContentLoaded", renderLikes);


const submitDisike = async () => {

  try {
    const res = await fetch(`/blogs/${input1.dataset.doc}/dislikes`, {
      method: 'POST',
      headers:{ 'content-type': 'application/json' }
    });
    const data = await res.json();
    location.reload();
  } catch (err) {
    console.log(err);
    location.replace("/login");
  }

}
dislikebtn.addEventListener('click', submitDisike);

const renderDisikes = async() => {
    const res = await fetch(`/blogs/${input1.dataset.doc}/dislikes`);
    const dislike = await res.json();
    input2.value= dislike.dislikes.length
}
document.addEventListener("DOMContentLoaded", renderDisikes);

function hideBtn(){
  submitBtn.style.display = '';
} 

wrtnComment.addEventListener('click', function(){
  submitBtn.style.display = 'inline';
}); 
  

async function submitComment(e) {
  e.preventDefault();
  try {
    const doc = {
        message: wrtnComment.value
    };
    if (wrtnComment.value == "") {
      alert("Please write your comment before sending!")
    } else {
      const res = await fetch(`/blogs/${input1.dataset.doc}/comments`, {
          method: 'POST',
          body: JSON.stringify(doc),
          headers:{ 'content-type': 'application/json' }
      });
      const data = await res.json();
      location.reload();
    }
  } catch (err) {
    console.log(err);
    location.replace("/login");
  }
};



const renderComments = async (e) => {
  e.preventDefault;
  let uri = `/blogs/${input1.dataset.doc}/comments`;

  const res = await fetch(uri);
  const posts = await res.json();
  let comment = posts.comments;
  let template ='';
  comment.forEach(post => {
  template += `
   <div class="second">
      <img src="/comment.png" alt="">
      <div class="comment">
         <div class="sender"> <p> ${post.email} </p> </div>
         <div class="message"> <p> ${post.message} </p> </div>
      </div> 
    </div>
     `
  });
  
  commentSection.innerHTML = template;
};

submitBtn.addEventListener('click', submitComment);
document.addEventListener("DOMContentLoaded", renderComments);