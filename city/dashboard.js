import { db } from "../firebase.js";

import {
collection,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const ordersBox = document.getElementById("orders");
const revenueBox = document.getElementById("revenue");
const pendingBox = document.getElementById("pending");
const deliveredBox = document.getElementById("delivered");
const ordersList = document.getElementById("ordersList");

onSnapshot(collection(db,"orders"),(snapshot)=>{

ordersList.innerHTML="";

let revenue=0;
let totalOrders=0;
let pending=0;
let delivered=0;

snapshot.forEach(doc=>{

const order=doc.data();

totalOrders++;

revenue+=Number(order.total);

if(order.status==="Pending") pending++;

if(order.status==="Delivered") delivered++;

ordersList.innerHTML+=`

<div class="card">

<h3>${order.customerName}</h3>

<p>₹${order.total}</p>

<p>${order.payment}</p>

<p>${order.status}</p>

</div>

`;

});

ordersBox.innerHTML=totalOrders;
revenueBox.innerHTML="₹"+revenue;
pendingBox.innerHTML=pending;
deliveredBox.innerHTML=delivered;

});