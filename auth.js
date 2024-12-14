const express = require("express");
const router = express.Router();
const { db, setDoc, doc } = require("../firebase-admin"); // Import Firestore
const { getAuth } = require("firebase-admin/auth"); // Firebase Admin SDK to verify user


// Middleware to verify token
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
    if (!token) {
        return res.status(403).send("No token provided.");
    }

    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send("Unauthorized");
    }
};

// Route to register a user (email/password)
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // First, you might want to create the user in Firebase Authentication (you can move this to frontend)
        // You can skip this on the backend as you're using Firebase on the frontend already

        // Use email as the UID to store user info in Firestore
        const userCredential = await getAuth().createUser({
            email: email,
            password: password
        });

        // Store additional user information in Firestore, using Firebase UID
        await setDoc(doc(db, "users", userCredential.uid), {
            name,
            email,
            createdAt: new Date(),
        });

        res.status(200).send("User registered successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});

// Route to register via Google Sign-In
router.post("/register-google", async (req, res) => {
    const { name, email } = req.body;

    try {
        // Use email as the UID to store user info in Firestore
        const userCredential = await getAuth().getUserByEmail(email);

        // Store Google user data in Firestore
        await setDoc(doc(db, "users", userCredential.uid), {
            name,
            email,
            createdAt: new Date(),
        });

        res.status(200).send("User registered via Google.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user via Google.");
    }
});
// Route to get user profile
router.get("/profile", verifyToken, async (req, res) => {
    const userId = req.user.uid; // Get user ID from the verified token
    try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(userDoc.data());
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send("Error fetching profile");
    }
});

module.exports = router;
