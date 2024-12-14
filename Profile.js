// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//     const [profile, setProfile] = useState({});
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/auth/profile', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setProfile(response.data);
//         };

//         fetchProfile();
//     }, []);

//     const handleSave = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.put(
//                 'http://localhost:3000/auth/profile',
//                 { ...profile },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setEditMode(false);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             alert('Failed to update profile.');
//         }
//     };

//     return (
//         <div>
//             <h1>Profile</h1>
//             {editMode ? (
//                 <>
//                     <input
//                         type="text"
//                         value={profile.name}
//                         onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         value={profile.study_program}
//                         placeholder="Study Program"
//                         onChange={(e) =>
//                             setProfile({ ...profile, study_program: e.target.value })
//                         }
//                     />
//                     <input
//                         type="text"
//                         value={profile.university}
//                         placeholder="University"
//                         onChange={(e) =>
//                             setProfile({ ...profile, university: e.target.value })
//                         }
//                     />
//                     <button onClick={handleSave}>Save</button>
//                 </>
//             ) : (
//                 <div>
//                     <p>Name: {profile.name}</p>
//                     <p>Study Program: {profile.study_program}</p>
//                     <p>University: {profile.university}</p>
//                     <button onClick={() => setEditMode(true)}>Edit Profile</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Profile;
///SEPARATE

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//     const [profile, setProfile] = useState({});
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const token = localStorage.getItem('token');
//             console.log("Token:", token); // Log the token for debugging

//             // Check if the token exists
//             if (!token) {
//                 alert('No token provided. Please log in.'); // Alert if no token
//                 return; // Exit the function if no token
//             }

//             try {
//                 const response = await axios.get('http://localhost:5001/auth/profile', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setProfile(response.data);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//                 alert('Failed to fetch profile.');
//             }
//         };

//         fetchProfile();
//     }, []);

//     const handleSave = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.put(
//                 'http://localhost:5001/auth/profile', // Update this URL as well if you implement the PUT route
//                 { ...profile },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setEditMode(false);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             alert('Failed to update profile.');
//         }
//     };

//     return (
//         <div>
//             <h1>Profile</h1>
//             {editMode ? (
//                 <>
//                     <input
//                         type="text"
//                         value={profile.name}
//                         onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                     />
//                     <input
//                         type="text"
//                         value={profile.study_program}
//                         placeholder="Study Program"
//                         onChange={(e) =>
//                             setProfile({ ...profile, study_program: e.target.value })
//                         }
//                     />
//                     <input
//                         type="text"
//                         value={profile.university}
//                         placeholder="University"
//                         onChange={(e) =>
//                             setProfile({ ...profile, university: e.target.value })
//                         }
//                     />
//                     <button onClick={handleSave}>Save</button>
//                 </>
//             ) : (
//                 <div>
//                     <p>Name: {profile.name}</p>
//                     <p>Study Program: {profile.study_program}</p>
//                     <p>University: {profile.university}</p>
//                     <button onClick={() => setEditMode(true)}>Edit Profile</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Profile;

//SEPARATE
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Ensure you import auth and db
//import axios from 'axios';
import { doc, getDoc } from "firebase/firestore"; // Import getDoc

function Profile() {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser; // Get the currently authenticated user
            if (!user) {
                alert('No user is logged in. Please log in.');
                return;
            }

            const uid = user.uid; // Get the user's UID
            try {
                const userDocRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userDocRef);
                //const userDoc = await db.collection('users').doc(uid).get(); // Fetch user data from Firestore
                if (userDoc.exists) {
                    setProfile(userDoc.data()); // Set the profile state with user data
                } else {
                    alert('User profile not found.');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser; // Get the currently authenticated user
        if (!user) {
            alert('No user is logged in. Please log in.');
            return;
        }

        const uid = user.uid; // Get the user's UID
        try {
            await db.collection('users').doc(uid).update({ ...profile }); // Update user data in Firestore
            setEditMode(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile.');
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={profile.study_program}
                        placeholder="Study Program"
                        onChange={(e) =>
                            setProfile({ ...profile, study_program: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={profile.university}
                        placeholder="University"
                        onChange={(e) =>
                            setProfile({ ...profile, university: e.target.value })
                        }
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Study Program: {profile.study_program}</p>
                    <p>University: {profile.university}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;