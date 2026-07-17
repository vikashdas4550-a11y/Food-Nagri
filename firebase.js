import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS8rIjDG-PXuWrKoC-eDLDMNnt6ox2tLA",
  authDomain: "food-nagri-32c39.firebaseapp.com",
  projectId: "food-nagri-32c39",
  storageBucket: "food-nagri-32c39.appspot.com",
  messagingSenderId: "349370372853",
  appId: "1:349370372853:web:ee88c05ded471da1eb6bbc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };