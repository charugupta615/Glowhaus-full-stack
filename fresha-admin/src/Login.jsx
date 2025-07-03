// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('admin');  // Default to 'admin'
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const endpoint = role === 'admin' ? '/api/admin/login' : '/api/business/login';
//       const res = await axios.post(endpoint, { email, password });

//       // Save token and role in localStorage
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', role);

//       // Redirect based on role
//       if (role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/business/dashboard');
//       }
//     } catch (err) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         {/* Role Selection */}
//         <label htmlFor="role">Login as:</label>
//         <select
//           id="role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="admin">Admin</option>
//           <option value="business">Business</option>
//         </select>

//         {/* Email and Password */}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* Submit */}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
