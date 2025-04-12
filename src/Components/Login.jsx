import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Hook for navigation
    const SendData = async (event) => {
        event.preventDefault(); // Prevent form reload
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/student/login/",  // Correct API endpoint
                { email, password },
                {
                    headers: { 
                        "Content-Type": "application/json" // Ensure JSON format
                    }
                }
            );
    
            console.log("Response:", response.data);

            if (response.status === 200) {
                alert("Login Successful!");
               // localStorage.setItem("userEmail", email);  // Store email for later use
               localStorage.setItem("userData", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token); // Store token for authentication   
                
                navigate('/login/Home'); // Redirect on success
           
            }
    
        } catch (error) {
            console.error("Login Error:", error.response?.data || error);
    
            // Handle 404 (User not found)
            if (error.response?.status === 404) {
                alert("User not found! Please register first.");
                navigate('/register');
            } else {
                alert(error.response?.data?.message || "Login Failed! Please check your credentials.");
            }
        }
    };
    
        

    return (
        <div className='register'>
            <div className='Welcome'>
                <div className="circle yellow-circle"></div>
                <div className="circle blue-circle"></div>
                <h2 className='Title'>Welcome to ASPU hub</h2>
                <p className='explain'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores, aliquam ab dolores quod atque excepturi 
                    ut aperiam commodi veritatis tempore architecto ipsum, 
                    repellendus ullam. Sit sint rerum quibusdam. Labore, aspernatur?
                </p>            
            </div>

            <div className='Accounts-Log'>
                <h1 className='Title'>Hello Again</h1>
                <h3 className='space'>Please enter Your<br/>Email and Password</h3>
                
                <form onSubmit={SendData}>
                    <input 
                        className='same-Log' 
                        type='email' 
                        placeholder='Email' 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input 
                        className='same-Log' 
                        type="password" 
                        placeholder='Password' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <div className='Forget'>
                        <Link to='/Forget'><p>Forget Your Password?</p></Link>
                        <p>Keep LogIn</p>
                        <input type="checkbox" />
                    </div>

                    <button type="submit" className='Login-Btn'>Login</button>
                </form>

                <footer>
                    Don't Have an Account? <Link to='/'>Register</Link>
                </footer>
            </div>
        </div>
    );
}
