import React from 'react';
import img1 from '../assets/Images/insLogin.jpg'
import img2 from '../assets/Images/signup.webp';
import Template from '../components/loginSignup/Template';

const Signup = ({setIsLoggedIn}) => {
    return (
        <Template stSignImg={img2} insSignImg={img1}  type="signup"  setIsLoggedIn={setIsLoggedIn}  ></Template>
    );
}

export default Signup;
        