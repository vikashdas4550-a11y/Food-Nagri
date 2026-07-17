// import { auth, db } from "./firebase.js";

// import {
// signInWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// import {
// doc,
// getDoc
// } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// const loginForm=document.getElementById("loginForm");

// loginForm.addEventListener("submit",async(e)=>{

// e.preventDefault();

// const email=document.getElementById("email").value;
// const password=document.getElementById("password").value;

// try{

// const userCredential=await signInWithEmailAndPassword(auth,email,password);

// const docRef=doc(db,"users",userCredential.user.uid);

// const docSnap=await getDoc(docRef);

// if(docSnap.exists()){

// const data=docSnap.data();

// alert("Welcome "+data.name);

// }

// window.location.href="index.html";

// }catch(error){

// alert(error.message);

// }

// });



import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Admin Email
        if (userCredential.user.email === "vikash@gmail.com") {

            alert("Admin Login Successful");
            window.location.href = "./city/admin.html";

        } else {

            alert("User Login Successful");
            window.location.href = "./index.html"; // ya profile.html

        }

    } catch (error) {
        alert(error.message);
    }
});