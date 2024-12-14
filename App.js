import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import ErrorHandler from "./components/Shared/ErrorHandler";
import AuthCard from "./components/Auth/AuthCardComponent"; // New combined Auth component
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import SearchBar from "./components/Search/SearchBar";
import Connections from "./components/Connections/Connections";
import Chat from "./components/Messaging/Chat";

import UserList from "./components/Messaging/UserList"; // Import UserList
import { db, collection, getDocs } from './firebase'; // Adjust the import path as necessary


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Newly added1
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState(null);

  // Simulate user login/logout
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(true);


  //Newly added1
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users'); // Assuming you have a 'users' collection
        const usersSnapshot = await getDocs(usersRef);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {/* Show Navbar only when the user is authenticated */}
      {isAuthenticated && <Navbar onLogout={logout} />}

      <ErrorHandler>
        <Routes>
          {/* Unauthenticated Routes */}
          {!isAuthenticated && (
            <>
              <Route
                path="/"
                element={<AuthCard onLogin={login} />} // AuthCard handles Login & Register
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {/* Authenticated Routes */}
          {isAuthenticated && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/connections" element={<Connections />} />
              {/* <Route path="/chat" element={<Chat />} /> */}
              <Route path="/chat" element={<Chat recipientId={recipientId} />} />
              <Route path="/" element={<UserList users={users} onSelectUser={setRecipientId} />} /> {/* Render UserList */}
              {/* Default Authenticated Route */}
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="*" element={<Navigate to="/profile" replace />} />
            </>
          )}
        </Routes>
      </ErrorHandler>
    </Router>
  );
}

export default App;

//SEPARATE 1

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Navbar from "./components/Shared/Navbar";
// import ErrorHandler from "./components/Shared/ErrorHandler";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import Profile from "./components/Profile/Profile";
// import EditProfile from "./components/Profile/EditProfile";
// import SearchBar from "./components/Search/SearchBar";
// //import AuthCard from "./components/Auth/AuthCard"
// import Connections from "./components/Connections/Connections";

// import Chat from "./components/Messaging/Chat";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Simulate user login/logout
//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <Router>
//       {/* Show Navbar only when the user is authenticated */}
//       {isAuthenticated && <Navbar onLogout={logout} />}

//       <ErrorHandler>
//         <Routes>
//           {/* Unauthenticated Routes */}
//           {!isAuthenticated && (
//             <>
//               <Route path="/" element={<Navigate to="/login" replace />} />
//               <Route path="/login" element={<Login onLogin={login} />} />
//               <Route path="/register" element={<Register />} />
//             </>
//           )}

//           {/* Authenticated Routes */}
//           {isAuthenticated && (
//             <>
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/edit-profile" element={<EditProfile />} />
//               <Route path="/search" element={<SearchBar />} />
//               <Route path="/connections" element={<Connections />} />
//               <Route path="/chat" element={<Chat />} />
//               {/* Default Authenticated Route */}
//               <Route path="/" element={<Navigate to="/profile" replace />} />
//             </>
//           )}

//           {/* Catch-all Route */}
//           <Route path="*" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} replace />} />
//         </Routes>
//       </ErrorHandler>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Shared/Navbar";
// import ErrorHandler from "./components/Shared/ErrorHandler";


// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ErrorHandler>
//         <Routes>
//           <Route path="/" element={<><profile /><search /><connections /><chat /></>} />
//         </Routes>
//         {/* <Footer /> */}
//       </ErrorHandler>
//     </Router>
//   );
// }

// export default App;

