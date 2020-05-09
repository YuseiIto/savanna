import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCctelbPQNM__kbx6qNCLnBKtp7wlYWGKk",
    authDomain: "savannah-app.firebaseapp.com",
    databaseURL: "https://savannah-app.firebaseio.com",
    projectId: "savannah-app",
    storageBucket: "savannah-app.appspot.com",
    messagingSenderId: "1034099100594",
    appId: "1:1034099100594:web:2eacf7b892cfd39d31b2ab",
    measurementId: "G-D5VKV3N6VB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;