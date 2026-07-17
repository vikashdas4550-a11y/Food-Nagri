import { auth, db, storage } from "../firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");

const profileImage = document.getElementById("profileImage");
const profilePhoto = document.getElementById("profilePhoto");

const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const ordersContainer = document.getElementById("ordersContainer");


// =========================
// Login Check
// =========================

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="../login.html";
return;

}

loadProfile(user);

loadOrders(user);

});


// =========================
// Load Profile
// =========================

async function loadProfile(user){

const refDoc=doc(db,"users",user.uid);

const snap=await getDoc(refDoc);

if(snap.exists()){

const data=snap.data();

userName.innerHTML=data.name || "User";

userEmail.innerHTML=data.email;

nameInput.value=data.name || "";

phoneInput.value=data.phone || "";

addressInput.value=data.address || "";

emailInput.value=data.email;

if(data.photo){

profileImage.src=data.photo;

}

}

}


// =========================
// Update Profile
// =========================

saveBtn.addEventListener("click",async()=>{

const user=auth.currentUser;

await updateDoc(doc(db,"users",user.uid),{

name:nameInput.value,

phone:phoneInput.value,

address:addressInput.value

});

alert("✅ Profile Updated");

});


// =========================
// Upload Profile Photo
// =========================

profilePhoto.addEventListener("change",async(e)=>{

const file=e.target.files[0];

if(!file) return;

const user=auth.currentUser;

const storageRef=ref(storage,"profile/"+user.uid);

await uploadBytes(storageRef,file);

const url=await getDownloadURL(storageRef);

await updateDoc(doc(db,"users",user.uid),{

photo:url

});

profileImage.src=url;

alert("Profile Photo Updated");

});


// =========================
// Order History
// =========================

async function loadOrders(user){

ordersContainer.innerHTML="";

const q=query(

collection(db,"orders"),

where("userId","==",user.uid),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

if(snapshot.empty){

ordersContainer.innerHTML="<h3>No Orders Found</h3>";

return;

}

snapshot.forEach((doc)=>{

const order=doc.data();

ordersContainer.innerHTML+=`

<div class="order-card">

<div>

<h3>₹ ${order.total}</h3>

<p>${order.payment}</p>

<p>${order.city}</p>

</div>

<div class="order-status">

${order.status}

</div>

</div>

`;

});

}


// =========================
// Logout
// =========================

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="../login.html";

});


// =========================
// Dark Mode
// =========================

const darkBtn=document.getElementById("darkModeBtn");

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark");

darkBtn.innerHTML="☀️";

}

darkBtn.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

darkBtn.innerHTML="☀️";

}else{

localStorage.setItem("theme","light");

darkBtn.innerHTML="🌙";

}

};
profilePhoto.addEventListener("change",async(e)=>{

const file=e.target.files[0];

if(!file){

return;

}

const user=auth.currentUser;

const storageRef=ref(storage,"profile/"+user.uid);

await uploadBytes(storageRef,file);

const url=await getDownloadURL(storageRef);

profileImage.src=url;

});