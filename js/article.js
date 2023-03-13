let likebtn = document.querySelector('#likebtn');
let dislikebtn = document.querySelector('#dislikebtn');
let input1 = document.querySelector('#input-1');
let input2 = document.querySelector('#input-2');
const submitBtn = document.querySelector('.submit-btn');
const wrtnComment = document.querySelector('textarea');
const rightSide = document.querySelector('.right-side');
const body = document.querySelector('body');
const commentSection = document.querySelector('.commentSection');

likebtn.addEventListener('click',()=> {
    input1.value = parseInt(input1.value) + 1;
    input1.style.color = "green";
    likebtn.style.color = "green";
})
dislikebtn.addEventListener('click',()=> {
    input2.value = parseInt(input2.value) + 1;
})


function hideBtn(){
  submitBtn.style.display = '';
} 

wrtnComment.addEventListener('click', function(){
  submitBtn.style.display = 'inline';
}); 
  

async function submitComment(e) {
  e.preventDefault();
  
  const doc = {
      name: "",
      comment: wrtnComment.value
  };
  await fetch('http://localhost:3000/comments', {
      method: 'POST',
      body: JSON.stringify(doc),
      headers:{ 'content-type': 'application/json' }
  })
};

function addComment(e) {
  e.preventDefault;
  const div = document.createElement('div')
  div.classList = 'second'
  div.innerHTML = `
    <img src="/comment.png" alt="">
      <div class="comment">
          <p> ${wrtnComment.value} </p> 
      </div> 
  `
  let ideas = wrtnComment.value;
  if (ideas !== '') {
    console.log (ideas);
  } else {
    console.log ("there is no idea");
    div.innerHTML= ``;
  };
  
  rightSide.insertAdjacentElement('beforeend', div);
  wrtnComment.value = "";
  hideBtn();
}

const renderComments = async (e) => {
  e.preventDefault;
  let uri = 'http://localhost:3000/comments';

  const res = await fetch(uri);
  const posts = await res.json();

  let template ='';
  posts.forEach(post => {
  template += `
   <div class="second">
      <img src="/comment.png" alt="">
      <div class="comment">
          <p> ${post.comment} </p> 
      </div> 
    </div>
     `
  });
  
  commentSection.innerHTML = template;
};

submitBtn.addEventListener('click', submitComment);
document.addEventListener("DOMContentLoaded", renderComments);