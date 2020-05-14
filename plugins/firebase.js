import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBLf14cq8s2ba8pvRGfjH5ZL_2-aJiQ400",
    authDomain: "savannah-app.firebaseapp.com",
    databaseURL: "https://savannah-app.firebaseio.com",
    projectId: "savannah-app",
    storageBucket: "savannah-app.appspot.com",
    messagingSenderId: "1034099100594",
    appId: "1:1034099100594:web:2eacf7b892cfd39d31b2ab",
    measurementId: "G-EFKKW8P2JR"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;