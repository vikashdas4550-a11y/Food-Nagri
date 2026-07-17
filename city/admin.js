import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const ordersDiv = document.getElementById("orders");

// ======================
// Admin Authentication
// ======================
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "../admin-login.html";
        return;
    }

    if (user.email !== "vikash@gmail.com") {
        alert("Access Denied!");

        signOut(auth);

        window.location.href = "../admin-login.html";
        return;
    }

    // Admin Login Success
    loadOrders();

});

// ======================
// Load Orders
// ======================
async function loadOrders() {

    try {

        ordersDiv.innerHTML = "<h2>Loading Orders...</h2>";

        const querySnapshot = await getDocs(collection(db, "orders"));

        ordersDiv.innerHTML = "";

        if (querySnapshot.empty) {

            ordersDiv.innerHTML = "<h2>No Orders Found</h2>";
            return;

        }

        querySnapshot.forEach((document) => {

            const order = document.data();

            ordersDiv.innerHTML += `

            <div class="card">

                <h2>${order.customerName}</h2>

                <p><b>Phone:</b> ${order.phone}</p>

                <p><b>Address:</b> ${order.address}</p>

                <p><b>City:</b> ${order.city}</p>

                <p><b>Pincode:</b> ${order.pincode}</p>

                <p><b>Payment:</b> ${order.payment}</p>

                <p><b>Total:</b> ₹${order.total}</p>

                <p><b>Status:</b> ${order.status}</p>

                <select onchange="changeStatus('${document.id}',this.value)">

                    <option value="">Change Status</option>

                    <option value="Pending">Pending</option>

                    <option value="Preparing">Preparing</option>

                    <option value="Out for Delivery">Out for Delivery</option>

                    <option value="Delivered">Delivered</option>

                </select>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

        ordersDiv.innerHTML = `
            <h2 style="color:red;">
                ${error.message}
            </h2>
        `;

    }

}

// ======================
// Change Order Status
// ======================
window.changeStatus = async function(id, status) {

    if (status === "") return;

    try {

        await updateDoc(doc(db, "orders", id), {

            status: status

        });

        alert("Status Updated Successfully");

        loadOrders();

    } catch (error) {

        console.log(error);

        alert("Status Update Failed");

    }

}

// ======================
// Logout
// ======================
document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "../login.html";

});