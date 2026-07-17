import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {

        console.log("Login Success");
        console.log(userCredential.user.email);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (userCredential.user.email === "vikash@gmail.com") {

            alert("✅ Admin Login Successful");

            window.location.href = "./city/admin.html";

        } else {

            alert("❌ You are not an Admin");

            await auth.signOut();

            window.location.href = "./index.html";
        }

    } catch (error) {

        alert(error.code + "\n" + error.message);

    }
});