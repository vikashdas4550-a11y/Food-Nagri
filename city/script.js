// =========================
// Add to Cart Counter
// =========================

let count = 0;

const cartCount = document.getElementById("count");
const addButtons = document.querySelectorAll(".add");

addButtons.forEach(button => {
    button.addEventListener("click", () => {

        count++;
        cartCount.innerText = count;

        alert("🍔 Item added to cart successfully!");
    });
});


// =========================
// Search Food
// =========================

const searchInput = document.getElementById("search");

if (searchInput) {

searchInput.addEventListener("keyup", function () {

let value = this.value.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach(card => {

let title = card.querySelector("h3").innerText.toLowerCase();

if (title.includes(value)) {

card.style.display = "block";

}

else {

card.style.display = "none";

}

});

});

}


// =========================
// Mobile Menu
// =========================

const menuBtn = document.getElementById("menu-btn");

const navbar = document.querySelector("nav");

if(menuBtn){

menuBtn.onclick = ()=>{

navbar.classList.toggle("active");

}

}


// =========================
// Contact Form
// =========================

// const form = document.querySelector("form");

// if(form){

// form.addEventListener("submit",function(e){

// e.preventDefault();

// alert("✅ Thank you! Your message has been sent.");

// form.reset();

// });

// }


// =========================
// Scroll Animation
// =========================

window.addEventListener("scroll",()=>{

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let position=card.getBoundingClientRect().top;

let screen=window.innerHeight;

if(position<screen-100){

card.style.opacity="1";

card.style.transform="translateY(0)";

}

});

});
// Wishlist

document.querySelectorAll(".heart").forEach((heart)=>{

heart.addEventListener("click",()=>{

heart.classList.toggle("active");

});

});


// Open Cart

// const cart=document.getElementById("cartSidebar");

// const cartIcon=document.querySelector(".cart");

// cartIcon.onclick=()=>{

// cart.classList.add("active");

// }


// Close Cart

// document.getElementById("closeCart").onclick=()=>{

// cart.classList.remove("active");

// }


// Add To Cart

// let total=0;

// const prices=[89,59,49,49,149];

// const items=document.getElementById("cartItems");

// const totalPrice=document.getElementById("total");

// document.querySelectorAll(".add").forEach((btn,index)=>{

// btn.onclick=()=>{

// let div=document.createElement("div");

// div.innerHTML=`
// <p>Burger ₹${prices[index]}</p>
// `;

// items.appendChild(div);

// total+=prices[index];

// totalPrice.innerHTML=total;

// }

//});


// Checkout

// document.getElementById("checkout").onclick=()=>{

// if(total==0){

// alert("Cart is Empty");

// }

// else{

// alert("Order Placed Successfully 🍔");

// items.innerHTML="";

// total=0;

// totalPrice.innerHTML=0;

// cart.classList.remove("active");

// }

// }