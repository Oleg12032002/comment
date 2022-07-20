function commentCreate(mine, name, time, text, avatar_url, level, score = 0, userReference = "") {
  return `
    <div class="comment-box">
    <div class="comment">
      <div class="like-box">
        <div class="plus" onclick="clickPlus(this)"><img src="./img/icon-plus.svg"></div>
        <div class="score">${score}</div>
        <div class="minus" onclick="clickMinus(this)"><img src="./img/icon-minus.svg"></div>
      </div>
      <div class="comment-content-box">
        <div class="comment-top">
          <div class="avatar-name-time">
            <div class="avatar-1"><img src=${avatar_url}></div>
            <div class="user-name">${name}</div>
            <div class="comment-time">${time}</div>
          </div>
          ${
            mine ? 
            `
              <div class="button-box">
                <div class="button-delete">
                  <div>
                    <img class="icon-comment" src="./img/icon-delete.svg">
                  </div>
                  <div onclick="clickDeleteReplyButton(this)">Delete</div>
                </div>
                <div class="button-edit">
                  <div>
                    <img class="icon-comment" src="./img/icon-edit.svg">
                  </div>
                  <div onclick="clickEditReplyButton(this)">Edit</div>
                </div>
              </div>
            ` 
            :
            `
              <div class="button-box">
                <div class="button-reply">
                    <div>
                        <img class="icon-comment" src="./img/icon-reply.svg">
                    </div>
                    <div onclick="clickReplyButton(this)">Reply</div>
                </div>
              </div>
            `
          }
          
        </div>
        <div class="comment-bottom">
          ${level == 2 ? `<span>` + `@` + userReference + `</span>` + " " + text : text}  
        </div>
        
        <div class="comment-mobile">
          <div class="like-box-mobile">
            <div class="plus" onclick="clickPlus(this)"><img src="./img/icon-plus.svg"></div>
            <div class="score">${score}</div>
            <div class="minus" onclick="clickMinus(this)"><img src="./img/icon-minus.svg"></div>
          </div>

          ${
            mine ? 
            `
              <div class="button-box">
                <div class="button-delete">
                  <div>
                    <img class="icon-comment" src="./img/icon-delete.svg">
                  </div>
                  <div onclick="clickDeleteReplyButton(this)">Delete</div>
                </div>
                <div class="button-edit">
                  <div>
                    <img class="icon-comment" src="./img/icon-edit.svg">
                  </div>
                  <div onclick="clickEditReplyButton(this)">Edit</div>
                </div>
              </div>
            ` 
            :
            `
              <div class="button-box">
                <div class="button-reply">
                    <div>
                        <img class="icon-comment" src="./img/icon-reply.svg">
                    </div>
                    <div onclick="clickReplyButton(this)">Reply</div>
                </div>
              </div>
            `
          }
        </div>



      </div>
    </div>
    ${level == 1 ? `
    <div class="level-2">
        <div class="line">
          <div></div>
        </div>
      <div class="level-2-comments-reply"></div>
    </div>
    ` : ``}
  </div>
    `
}



function addReference(text) {
  let newText = ``;
  let link = false;
  for(char of text) {
    if(char == '@') {
      newText += `<span>`
      link = true;
    }

    if(link == true && char == ' ') {
      console.log(2);
      newText += `</span>`
      link = false;
    }

    newText += char;
  }
  return newText;
}



function clickMinus(e) {
  e.parentElement.querySelector('.score').innerHTML = 
  e.closest('.comment-box').querySelector('.like-box-mobile').querySelector('.score').innerHTML =
    Number.parseInt(e.parentElement.querySelector('.score').innerHTML) - 1;
}

function clickPlus(e) {
  e.parentElement.querySelector('.score').innerHTML = 
  e.closest('.comment-box').querySelector('.like-box-mobile').querySelector('.score').innerHTML =
    Number.parseInt(e.parentElement.querySelector('.score').innerHTML) + 1;
}




function clickEditReplyButton(e) {
  const el = e.closest('.comment-box').querySelector('.comment-content-box');
  el.querySelector('.comment-bottom').innerHTML = `
    <textarea class="send-textarea" rows="5" placeholder="Add a comment...">
      ${el.querySelector('.comment-bottom').textContent.trim()}
    </textarea>
  `;

  el.innerHTML = el.innerHTML + `
    <div class="align-right">
      <button class="button-send-reply" onclick="clickUpdateReplyButton(this)">Update</button>
    </div>
  `
}


function clickUpdateReplyButton(e) {
  const el = e.closest('.comment-box').querySelector('.comment-content-box');
  let text = el.querySelector('.send-textarea').value;
  text = addReference(text);

  el.querySelector('.comment-bottom').innerHTML = text;
  el.querySelector('.button-send-reply').remove();
}




let popupCancel = (el) => {
  document.querySelector('.popup').style.display = 'none';
};

let popubDelete;


function clickDeleteReplyButton(e) {
  document.querySelector('.popup').style.display = 'flex';
  
  popubDelete = (el, elementDelete = e) => {
    document.querySelector('.popup').style.display = 'none';
    let node = e.closest('.comment-box');
    node.remove();
  }
}



let valuesUserReply = "";
function clickReplyButton(e) {
    valuesUserReply = `${e.closest('.comment-box').querySelector('.comment-top').querySelector('.user-name').innerHTML}`;
    const node = document.createElement("div");
    node.classList = "add-reply";
    node.innerHTML = `
      <div class="avatar-1"><img src="${curentUser.avatar}"></div>
      <textarea id="send-textarea" rows="3" placeholder="Add a comment..."></textarea>
      <button class="button-send-reply send-button" onclick="clickSendReply(this)">reply</button>
    `;

    [...document.querySelectorAll('.add-reply')].map((e) => {
      console.log(e);
      e.remove();
    });

    if(e.closest('.level-2') != null) {
      console.log(1)
      e.closest('.level-2').querySelector('.level-2-comments-reply').insertBefore(node, e.closest('.comment-box').nextSibling);
    } else {
      const el = e.closest('.comment-box').querySelector('.level-2').querySelector('.level-2-comments-reply');
      if(el.lastChild != 0) {
        el.insertBefore(node, el.lastChild);
      } else {
        el.appendChild(node)
      }
    }
} 



function clickSendReply(e) {
  let text = e.closest('.add-reply').querySelector('#send-textarea').value;
  text = addReference(text);
  
  let tempNode = document.createElement('div');
  tempNode.innerHTML = commentCreate(true, curentUser.name, "second ago", text, curentUser.avatar, 2, 0, valuesUserReply);
  const node = tempNode.firstElementChild;
  let container = e.closest('.add-reply').parentElement;
  container.insertBefore(node, e.closest('.add-reply')); 
  e.closest('.add-reply').remove();
}









document.addEventListener("DOMContentLoaded", () => {

  

  curentUser = {
    name: "Oleg",
    avatar: "./img/avatars/image-juliusomo.png",
  }



  const c = `
  {
    "currentUser": {
      "image": { 
        "png": "./img/avatars/image-juliusomo.png",
        "webp": "./img/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./img/avatars/image-amyrobson.png",
            "webp": "./img/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./img/avatars/image-maxblagun.png",
            "webp": "./img/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./img/avatars/image-ramsesmiron.png",
                "webp": "./img/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./img/avatars/image-juliusomo.png",
                "webp": "./img/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
  }
  `



  let {currentUser, comments} = JSON.parse(c);
  currentUser = {
    avatar: currentUser.image.png,
    name: currentUser.username
  }
  
  document.querySelector('.content').innerHTML = `
    <div class="comments">
    </div>
    
    <div class="add-comment">
        <div class="avatar-1"><img src="${currentUser.avatar}"></div>
        <textarea id="send-textarea" rows="3" placeholder="Add a comment..."></textarea>
        <button class="button-send-reply send-button">Send</button>
    </div>
  `
  let sendButton = document.querySelector('.send-button');

  contentHTML = ``;
  comments.forEach((el) => {
    let tempNode = document.createElement('div');
    tempNode.innerHTML = commentCreate(
      currentUser.name == el.user.username, 
      el.user.username,
      el.createdAt, 
      el.content, 
      el.user.image.png, 
      1, 
      el.score
    );
    
    let node = tempNode.firstElementChild;

    el.replies.forEach(reply => {
      node.querySelector('.level-2-comments-reply').innerHTML += commentCreate(
        currentUser.name == reply.user.username, 
        reply.user.username,
        reply.createdAt, 
        reply.content, 
        reply.user.image.png, 
        2, 
        reply.score,
        reply.replyingTo
      );
    })

    document.querySelector('.comments').appendChild(node); 

    
  })






  sendButton.addEventListener('click', function(e) {
      e.preventDefault();
      const el = e.target.parentElement.querySelector('#send-textarea'); 
      let text = el.value;
      text = addReference(text)
      if(text.trim() != "") {
        el.value = "";
        document.querySelector('.comments').innerHTML += commentCreate(true, curentUser.name, "Now", text, curentUser.avatar, 1);
      }
  })




    
});