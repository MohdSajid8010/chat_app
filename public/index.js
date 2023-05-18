

const socket = io('http://localhost:3000');

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username");
const chatForm = document.getElementById("chat-form");
const messages = document.getElementById("messages");

const usernamePopup = document.getElementById("username-popup");
const messageInput = document.getElementById("message");
let exitBtnEl=document.getElementById("exitBtn");
let username = "";


usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (usernameInput.value.trim() == "") {
    alert("Please enter a username.");
    return;
  }

  username = usernameInput.value;
  usernamePopup.style.display = "none";
  document.querySelector(".chat-container").style.display = "flex";
  document.querySelector(".chatroom-header").innerHTML = `<div>chatroom-${username}</div>
  <button type="button" onclick="exitFunc()" id="exitBtn">Exit</button>`;

  socket.emit("username enter", username);
});


chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!messageInput.value.trim()) {
    alert("Please enter a message.");
    return;
  }

  const data = {
    username: username,
    message: messageInput.value,
  };
  console.log(data);

  socket.emit("message", data);
  // addMessage(data, true);
  messageInput.value = "";

});
// receive user namw enter
socket.on("username enter", (username) => {
  
    messages.innerHTML += `<div class="message joinChatMess"><strong>${username} : </strong>join the chat.</div>`
   
});


// receive message
socket.on("message", (data) => {
  if (data.username === username) {
    addMessage(data, true);
  } else {
    addMessage(data, false);

  }
});

function addMessage(data, sent) {

  if (sent) {
    messages.innerHTML += `<div class="message sent"><strong>${data.username} : </strong>${data.message}</div>`

  } else {
    messages.innerHTML += `<div class="message received"><strong>${data.username} : </strong>${data.message}</div>`

  }

}

function exitFunc()
{
  console.log("inside button")
  document.querySelector(".chat-container").style.display = "none";
  usernamePopup.style.display = "block";

  socket.emit("username left", username);
}
// exitBtnEl.addEventListener("click",()=>{


// })

socket.on("username left", (username) => {
  messages.innerHTML += `<div class="message joinChatMess"><strong>${username} : </strong>left the chat.</div>`
  
});