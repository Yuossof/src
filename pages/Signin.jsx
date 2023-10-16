import React, { useState } from "react";
import './FrSignin.css'
import './SigninANDsignup.css'
import Header from "../components/header";
// import MainContent from "../components/mainContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import './SigninANDsignup.css';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/config';
// import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";




const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [resetPassword, serResetPassword] = useState("")
    const [password, setPassword] = useState("")
    const [hasErorr, sethasErorr] = useState(false)
    const [firebaseErr, setFirebaseErr] = useState(false)
    const [ShowResetPassP, setShowResetPassP] = useState(false)
    const [ShowForm, setShowForm] = useState("")
    const [ShowAndHideFormLogin, setShowAndHideFormLogin] = useState("")
    return (
        <>
            <Helmet>
                <title>Signin</title>
            </Helmet>

            <Header />


            <div className="contForm">
                <div className={`backGroundForm`}>

                    <div className={`Mother-forgot-pass ${ShowForm}`}>
                        <form className="forgot-password">
                            <div className="close" onClick={() => {
                                setShowForm("")
                                setShowAndHideFormLogin("")
                            }}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                            <input onChange={(eo)=>{
                                serResetPassword(eo.target.value)
                            }} required placeholder="Email" type="email" />

                            <button onClick={(eo) => {
                                eo.preventDefault();
                                
                                sendPasswordResetEmail(auth, resetPassword)
                                .then(()=>{
                                    setShowResetPassP(true)
                                })
                                .catch((error)=>{
                                    const errorCode = error.code;
                                    const errorMessage = error.message
                                })
                            }}>Reset Password</button>
                            {ShowResetPassP && <p>Please Check Your Email To Reset Your Password</p>}
                        </form>
                    </div>



                    <form className={`formLogin ${ShowAndHideFormLogin}`}>


                        <h1 id="h">Sign-In</h1>
                        <input onChange={(eo) => { setEmail(eo.target.value) }} id="inp1" required type="email" placeholder="Email" />
                        <input onChange={(eo) => { setPassword(eo.target.value) }} id="inp2" required type="password" placeholder="Password" />
                        {hasErorr && <p style={{ color: "red" }}>{firebaseErr}</p>}
                        <button onClick={(eo) => {
                            eo.preventDefault();

                            const auth = getAuth();
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    navigate("/")
                                    // ...
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    sethasErorr(true)


                                    if (errorCode === "auth/invalid-email") {
                                        setFirebaseErr("wrong email")
                                    } else if (errorCode === "auth/invalid-login-credentials") {
                                        setFirebaseErr("user not found")
                                    } else if (errorCode === "auth/wrong-password") {
                                        setFirebaseErr("wrong password")
                                    } else if (errorCode === "auth/invalid-password") {
                                        setFirebaseErr("wrong pass")
                                    }

                                });


                        }}>Sign-In</button>





                        <p className="pLink">Don't have an account <Link to="/Signup">Signup</Link></p>
                    </form>
                    <p className="forgot-pass-p" onClick={() => {
                        setShowForm("Mother-show-forgot-password")
                        setShowAndHideFormLogin("Hide-Form-login")
                    }}>Forgot Password?</p>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Signin;
