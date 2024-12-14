// firebase-admin.js (Backend)
const admin = require("firebase-admin");

// Use the Firebase Admin SDK to interact with Firebase services on the server-side
const serviceAccount = require("./service-account-file.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<my-db-classprjt>.firebaseio.com",
});

const db = admin.firestore();  // Firestore instance from Admin SDK
module.exports = { admin, db };
