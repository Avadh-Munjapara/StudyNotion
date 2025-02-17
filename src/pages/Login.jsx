import React from 'react';
import img1 from '../assets/Images/login.webp';
import img2 from '../assets/Images/insLogin.jpg'
import Template from '../components/loginSignup/Template';
const Login = ({setIsLoggedIn}) => {
    return (
     <Template insLoginImg={img2}  
     stLoginImg={img1} 
     type="login" setIsLoggedIn={setIsLoggedIn}  ></Template>
    );
}

export default Login;
