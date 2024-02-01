import authHandler from "../utils/authorization.js";
import { setCookie } from "../utils/cookie.js";
import {postData}from "../utils/httpReq.js";
import {validetionUser,validationPass } from "../utils/validation.js";

const inputBoxes = document.querySelectorAll("input");
const loginButton = document.querySelector("button");
const userError= document.getElementById("user-error");
const passError= document.getElementById("pass-error");


const submitHandler = async(event)=>{
    event.preventDefault();

    const username = inputBoxes[0].value;
    const password = inputBoxes[1].value;
    
   
    const validation = validateFrom(username,password);
    if(!validation)return;
    


    const response = await postData("auth/login" , {
        username,
        password
    });
console.log(response);

setCookie(response.token)
location.assign("index.html");

};


const validateFrom = (username , password)=>{
    const userResult = validetionUser(username);
    const passwordResult = validationPass(password);
    userError.innerHTML ="";
    userError.style.display = "none";
    passError.innerHTML ="";
    passError.style.display = "none";

    if(userResult && passwordResult){
        return true;

    }else if(!userResult){
        userError.style.display = "block";
        userError.innerText = "please enter the correct user";
        return;
        
        
    }else if(!passwordResult){
        passError.style.display = "block";
        passError.innerText = "please enter the password more than 6 chatecter";
        return;
    }
}


loginButton.addEventListener("click",submitHandler);
document.addEventListener("DOMContentLoaded",authHandler)