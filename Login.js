
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import { Input, Button } from "./StyleAuthCard";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
            onLogin();
        } catch (error) {
            console.error("Login error:", error);
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Login</Button>
        </form>
    );
}

export default Login;




//SEPARATE
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/login', { email, password });
//             localStorage.setItem('token', response.data.token);
//             window.location.href = '/profile';
//         } catch (error) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// }

// export default Login;
