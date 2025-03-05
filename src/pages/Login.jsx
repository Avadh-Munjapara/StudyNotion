import React, { useState } from 'react';
import img1 from '../assets/Images/login.webp';
import img2 from '../assets/Images/insLogin.jpg'
import Template from '../components/loginSignup/Template';
const Login = () => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    return (
     <Template insLoginImg={img2}  
     stLoginImg={img1} 
     type="login" setIsLoggedIn={setIsLoggedIn}  ></Template>
    );
}

export default Login;
