import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async(e)=>{

e.preventDefault();

const name=document.getElementById("name").value;
const phone=document.getElementById("phone").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

try{

const userCredential=await createUserWithEmailAndPassword(auth,email,password);

await setDoc(doc(db,"users",userCredential.user.uid),{

name:name,
phone:phone,
email:email,
role:"user"

});

alert("Signup Successful");

window.location.href="login.html";

}catch(error){

alert(error.message);

}

});