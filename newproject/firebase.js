// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABUWs1V9dV1DTye0DQk8uolfwwz1gvvVA",
  authDomain: "map-c01e5.firebaseapp.com",
  databaseURL: "https://map-c01e5-default-rtdb.firebaseio.com",
  projectId: "map-c01e5",
  storageBucket: "map-c01e5.appspot.com",
  messagingSenderId: "342719822878",
  appId: "1:342719822878:web:b6b9aa0005d6a9669b020f",
  measurementId: "G-YCWDWSXE6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);