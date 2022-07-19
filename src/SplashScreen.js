import React from 'react'
import "./SplashScreen.css";
import { useNavigate } from 'react-router';

const SplashScreen = () => {

const navigate = useNavigate();
 const HandleClick = ()=>{
    navigate("/Welcome");
 }
    return (
    <div className='body'>
        <p id="made-by">made by</p>
        <div id="name">
                KIRAN.
        </div>
        <button onClick={HandleClick} id="btn">
            Jump In!
        </button>
    </div>
  )
}

export default SplashScreen;
