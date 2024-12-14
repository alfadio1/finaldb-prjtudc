import React, { useState } from "react";
import {
    AuthContainer,
    AuthCard as StyledAuthCard,
    Tab,
    FormWrapper,
} from "./StyleAuthCard";
import Register from "./Register";
import Login from "./Login";

const AuthCardComponent = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState("login");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <AuthContainer>
            <StyledAuthCard>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Tab
                        $isActive={activeTab === "login"}
                        onClick={() => handleTabClick("login")}
                    >
                        Login
                    </Tab>
                    <Tab
                        $isActive={activeTab === "register"}
                        onClick={() => handleTabClick("register")}
                    >
                        Register
                    </Tab>
                </div>
                <FormWrapper>
                    {activeTab === "login" && <Login onLogin={onLogin} />}
                    {activeTab === "register" && <Register />}
                </FormWrapper>
            </StyledAuthCard>
        </AuthContainer>
    );
};

export default AuthCardComponent;






//SEPARATE
// import React, { useState } from "react";
// import {
//     AuthContainer,
//     AuthCard as StyledAuthCard, // Renamed styled component
//     Tab,
//     FormWrapper,
//     // Input,
//     // Button,
// } from "./StyleAuthCard";
// //i just added it now
// import Register from "./Register";
// import Login from "./Login";

// const AuthCardComponent = () => { // Renamed functional component
//     const [activeTab, setActiveTab] = useState("login");

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//     };

//     return (
//         <AuthContainer>
//             <StyledAuthCard> {/* Use the renamed styled component */}
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <Tab
//                         $isActive={activeTab === "login"}
//                         onClick={() => handleTabClick("login")}
//                     >
//                         Login
//                     </Tab>
//                     <Tab
//                         $isActive={activeTab === "register"}
//                         onClick={() => handleTabClick("register")}
//                     >
//                         Register
//                     </Tab>
//                 </div>
//                 <FormWrapper>
//                     {activeTab === "login" && <Login onLogin={onLogin} />}
//                     {activeTab === "register" && <Register />}
//                     {/* {activeTab === "login" && (
//                         <>
//                             <Input type="email" placeholder="Email" />
//                             <Input type="password" placeholder="Password" />
//                             <Button>Login</Button>
//                         </>
//                     )}
//                     {activeTab === "register" && (
//                         <>
//                             <Input type="text" placeholder="Name" />
//                             <Input type="email" placeholder="Email" />
//                             <Input type="password" placeholder="Password" />
//                             <Button>Register</Button>
//                         </>
//                     )} */}
//                 </FormWrapper>
//             </StyledAuthCard>
//         </AuthContainer>
//     );
// };

// export default AuthCardComponent;


//SEPARATE
// import React, { useState } from "react";
// import { AuthContainer, AuthCard, Tab, FormWrapper, Input, Button } from "./AuthStyles";

// const AuthCard = () => {
//     const [activeTab, setActiveTab] = useState("login");

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//     };

//     return (
//         <AuthContainer>
//             <AuthCard>
//                 <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//                     <Tab isActive={activeTab === "login"} onClick={() => handleTabClick("login")}>
//                         Login
//                     </Tab>
//                     <Tab isActive={activeTab === "signup"} onClick={() => handleTabClick("signup")}>
//                         Sign Up
//                     </Tab>
//                 </div>

//                 <FormWrapper>
//                     {activeTab === "login" ? (
//                         <>
//                             <Input type="email" placeholder="Email" />
//                             <Input type="password" placeholder="Password" />
//                             <Button>Login</Button>
//                         </>
//                     ) : (
//                         <>
//                             <Input type="email" placeholder="Email" />
//                             <Input type="password" placeholder="Password" />
//                             <Input type="password" placeholder="Confirm Password" />
//                             <Button>Sign Up</Button>
//                         </>
//                     )}
//                 </FormWrapper>
//             </AuthCard>
//         </AuthContainer>
//     );
// };

// export default AuthCard;
