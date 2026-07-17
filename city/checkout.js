import { db } from "../firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Cart Data
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Total Price
let total = 0;

cart.forEach((item) => {
  total += item.price * item.quantity;
});

// Show Total
document.getElementById("total").innerHTML = "Total : ₹" + total;

// Place Order Function
async function placeOrder() {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address || !city || !pincode) {
    alert("Please fill all details.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {

    await addDoc(collection(db, "orders"), {
      customerName: name,
      phone: phone,
      address: address,
      city: city,
      pincode: pincode,
      payment: payment,
      items: cart,
      total: total,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href = "success.html";

  } catch (error) {
    console.error(error);
    alert("Order Failed : " + error.message);
  }

}

// HTML button ke liye
 window.placeOrder = placeOrder;
document.getElementById("locationBtn").addEventListener("click", getLocation);

function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(success, error);

    } else {

        alert("Geolocation is not supported.");

    }

}

function error(err) {

    console.log(err);

    alert("Location permission denied.");

}







    async function success(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    try {

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        console.log(data);

        if (data.address) {

            document.getElementById("address").value =
                data.display_name || "";

            document.getElementById("city").value =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.county ||
                "";

            document.getElementById("pincode").value =
                data.address.postcode || "";

        } else {

            alert("Address not found");

        }

    } catch (err) {

        console.error(err);
        alert("Unable to fetch address");

    }

}
// window.location.href = "success.html";