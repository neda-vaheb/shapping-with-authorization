import authHandler from "../utils/authorization.js";
import { getData } from "../utils/httpReq.js";

const userContainer = document.querySelector("main");
const logoutButton = document.querySelector("button");

const showUsers =(users) =>{
  userContainer.innerHTML ="";
users.forEach(user => {
  const JSX = `<div class="user-container">
  <span class="number">${user.id}</span>
  <div class="user-info">
    <p><i class="fa-solid fa-user"></i> Name:</p>
    <h4>${user.name.firstname} ${user.name.lastname}</h4>
  </div>
  <div class="user-info">
    <p><i class="fa-solid fa-paperclip"></i> User-name:</p>
    <h4>${user.username} </h4>
  </div>
  <div class="user-info">
    <p><i class="fa-solid fa-envelope"></i> Email</p>
    <h4>${user.email} </h4>
  </div>
  <div class="user-info">
    <p><i class="fa-solid fa-phone"></i>Phone:</p>
    <h4>${user.number} </h4>
  </div>
  <div class="user-info">
    <p><i class="fa-solid fa-location-dot"></i>Address</p>
    <h4>${user.address.city} - ${user.address.street} - ${user.address.zipcode}</h4>
  </div>`;
  userContainer.innerHTML+=JSX;
});
 
}

const init = async()=>{
  authHandler();
  const users = await getData("users");
  showUsers(users);
};

const logoutHandler=()=>{
document.cookie ="token=; max-age=0"
location.assign("index.html");
};

document.addEventListener("DOMContentLoaded",init);
logoutButton.addEventListener("click",logoutHandler);