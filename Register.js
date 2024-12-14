import React, { useState } from "react";
import {
    auth,
    provider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc
} from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { GoogleButton, Input, Button } from "./StyleAuthCard";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Store additional data in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                createdAt: new Date().toISOString(),
                profile: {
                    study_program: "",
                    university: "",
                    skills: []
                }
            });

            alert("Registration successful! Please login.");
            window.location.href = "/";
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            await setDoc(doc(db, "users", result.user.uid), {
                name: result.user.displayName,
                email: result.user.email,
                createdAt: new Date().toISOString(),
                profile: {
                    study_program: "",
                    university: "",
                    skills: []
                }
            });

            alert("Google sign-in successful!");
            window.location.href = "/profile"; //to redirect to user profile
        } catch (error) {
            console.error("Google sign-in error:", error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
            />
            <Button type="submit">
                Register
            </Button>
            <p style={{ textAlign: 'center', margin: '10px 0' }}>or</p>
            <GoogleButton type="button" onClick={handleGoogleSignIn}>
                <FcGoogle style={{ marginRight: '8px' }} />
                Register with Google
            </GoogleButton>
        </form>
    );
}

export default Register;




//SEparate
// import React, { useState } from "react";
// import axios from "axios";
// //import { auth, provider, signInWithPopup } from "../../firebase";
// import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, db, setDoc, doc } from "../../firebase"; // Import necessary Firebase functions
// import { FcGoogle } from "react-icons/fc"; // Import Google icon
// import { GoogleButton, Input, Button } from "./StyleAuthCard"; // Import new and existing styled components


// function Register() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     // Handles traditional registration via API

//     const handleRegister = async () => {
//         try {
//             // Add validation
//             if (!name || !email || !password) {
//                 alert("Please fill in all fields");
//                 return;
//             }
//             console.log("Starting registration...");

//             // Register the user with Firebase Authentication
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             console.log("User created:", userCredential.user.uid);

//             // Store additional user information (name) in Firestore
//             await setDoc(doc(db, "users", user.uid), {
//                 name,
//                 email,
//                 createdAt: new Date(),
//             });
//             console.log("User data stored in Firestore");

//             // Optionally, send user data to backend
//             //await axios.post("http://localhost:3000/register", { name, email, password });
//             alert("Registration successful! You can now log in.");
//             window.location.href = "/";
//         } catch (error) {
//             alert("Error during registration. Please try again.");
//         }
//     };

//     // Handles Google Sign-In
//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;

//             // Store Google user data in Firestore
//             await setDoc(doc(db, "users", user.uid), {
//                 name: user.displayName,
//                 email: user.email,
//                 createdAt: new Date(),
//             });

//             // Optionally send Google user data to backend
//             await axios.post("http://localhost:3000/register-google", {
//                 name: user.displayName,
//                 email: user.email,
//             });

//             alert(`Welcome, ${user.displayName}! You have been registered.`);
//             window.location.href = "/";
//         } catch (error) {
//             console.error("Error  Google Sign-In:", error);
//             alert("Google Sign-In failed. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h1>Register</h1>
//             <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button onClick={handleRegister}>Register</Button>
//             <p>or</p>
//             <GoogleButton onClick={handleGoogleSignIn}>
//                 <FcGoogle /> Register with Google
//             </GoogleButton>
//         </div>
//     );
// }

// export default Register;


//SEPARATE

// const handleRegister = async () => {
//     console.log("Register button clicked");
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         console.log("Firebase user created:", userCredential);

//         await setDoc(doc(db, "users", userCredential.user.uid), {
//             name,
//             email,
//             createdAt: new Date(),
//         });
//         console.log("Firestore updated");

//         await axios.post("http://localhost:5000/register", { name, email, password });
//         console.log("Backend API called successfully");

//         alert("Registration successful! You can now log in.");
//         window.location.href = "/";
//     } catch (error) {
//         console.error("Error during registration:", error);
//         alert("Error during registration. Please try again.");
//     }
// }; testing!

// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegister = async () => {
//         try {
//             await axios.post('http://localhost:5000/register', { name, email, password });
//             alert('Registration successful! You can now log in.');
//             window.location.href = '/';
//         } catch (error) {
//             alert('Error during registration. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h1>Register</h1>
//             <input
//                 type="text"
//                 placeholder="Full Name"
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleRegister}>Register</button>
//         </div>
//     );
// }

// export default Register;
