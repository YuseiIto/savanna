const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

exports.helloWorld = functions
    .region("asia-northeast1")
    .https.onRequest((request, response) => {
        response.send("Hello from Firebase!");
    });

exports.isUserExixts = functions
    .region("asia-northeast1")
    .https.onRequest((request, response) => {
        db.collection("users")
            .where(
                "lowerUsername",
                "==",
                decodeURI(request.query.username).toLowerCase()
            )
            .get()
            .then(snapshot => {
                // CORS用にAccess-Control-Allow系ヘッダを追加
                response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // localhostを許可
                response.set(
                    "Access-Control-Allow-Methods",
                    "GET, HEAD, OPTIONS, POST"
                ); // DELETEだけ拒否
                response.set("Access-Control-Allow-Headers", "Content-Type"); // Content-Typeのみを許可

                if (snapshot.empty) {
                    console.log("No matching documents.");
                    response.send("false");
                } else {
                    response.send("true");
                }
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
    });