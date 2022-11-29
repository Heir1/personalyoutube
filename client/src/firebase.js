// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHrnp1sh8DH4ksC4KVVRRfvW1gMOSqzBE",
  authDomain: "fir-image-aa85c.firebaseapp.com",
  projectId: "fir-image-aa85c",
  storageBucket: "fir-image-aa85c.appspot.com",
  messagingSenderId: "395583962951",
  appId: "1:395583962951:web:20531690b94a8cf1415662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


// gs://fir-image-aa85c.appspot.com/images