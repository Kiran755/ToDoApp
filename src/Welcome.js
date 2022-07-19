import { signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {auth} from './firebase';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./Welcome.css";
const Welcome = ()=>{
    

const navigate = useNavigate();
useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        if(user){
            navigate("/mainPage");
        }
    });
},[]);


const [email,setEmail] = useState("");
const [pass,setPass] = useState("");
const [isUserSigningUp,setSignIn] = useState(false);
const [registeremail,setRegisterEmail] = useState("");
const [registerpass,setRegisterPass] = useState("");



const HandleRegisterEmail = (e)=>{
    setRegisterEmail(e.target.value);
}
const HandleRegisterPass = (e)=>{
    setRegisterPass(e.target.value);
}


const HandleRegisterClick = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,registeremail,registerpass).then(()=>{
        navigate("/mainPage")
    }).catch((err)=>{
        alert(err.message);
    })
}
const HandleEmail = (e)=>{
    setEmail(e.target.value);
}
const HandlePass = (e)=>{
    setPass(e.target.value);
}
const HandleClick = (e)=>{
    e.preventDefault();
    console.log(email);
    console.log(pass);
    signInWithEmailAndPassword(auth,email,pass).then(()=>{
        navigate("/mainPage")
    }).catch((err)=>{
        alert(err.message);
    })
}

const HandleSignUpPage = ()=>{
    setSignIn((signingIn)=>signingIn = !signingIn);
}
    return (
        <div className="SignInPage">
            {isUserSigningUp?
            <div className="signIn">
                <h1>Sign In Page</h1>
            <div className="signinbox">
                <form>
                    <input type="text"
                    placeholder="Email Id"
                    value={email}
                    onChange={(e)=>{HandleEmail(e)}}
                    />
                    <input type="password"
                    placeholder="password"
                    value={pass}
                    onChange={(e)=>{HandlePass(e)}}
                    />
                    <button onClick={(e)=>HandleClick(e)}>Log In</button>
                </form>
            </div>
            </div>:
            <div className="signIn">
                <h1>Sign Up Page</h1>
            <div className="signinbox">
                <form>
                    <input type="text"
                    placeholder="Email Id"
                    value={registeremail}
                    onChange={(e)=>{HandleRegisterEmail(e)}}
                    />
                    <input type="password"
                    placeholder="password"
                    value={registerpass}
                    onChange={(e)=>{HandleRegisterPass(e)}}
                    />
                    
                    <button onClick={(e)=>HandleRegisterClick(e)}>Create Account!</button>
                </form>
            </div>
            </div>
        
                }
            {isUserSigningUp?
            <div className="new_user">
                
                <h4>New User?
                </h4>
                <button onClick={HandleSignUpPage}>
                    Click Here To sign Up
                </button>
            </div> :<div className="new_user">
                
                <h4>Already a User?
                </h4>
                <button onClick={HandleSignUpPage}>
                    Click Here To sign In
                </button>
            </div> }
            
        </div>
    );
}
export default Welcome;