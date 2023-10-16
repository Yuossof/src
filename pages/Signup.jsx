import React from "react";
import Header from "../components/header";
// import MainContent from "../components/mainContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";



const Signup = () => {

    const [user, loading] = useAuthState(auth)

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")


     useEffect(()=>{
        if(user){
            if(!user.emailVerified){
                navigate("/")
            }
            if(user.emailVerified){
                navigate("/")
            }
        }
     })


    if (loading) {

        return (
            <div className="mothLoad">
                <Loading />
            </div>
        )
    }


    if(user){
        if (!user.emailVerified) {

            return (
                <div className="Box-Verify">
                    <p>We Send You An Email To Verify Your Account</p>
                    <button>Send Again</button>
                </div>
            )
        }
    }
    


    if (!user) {
        return (
            <>
                <Helmet>
                    <title>Signup</title>
                </Helmet>

                <Header />
                <div className="contForm">
                    <div className="backGroundForm">
                        <form className="formLogin2">
                            <h1 id="h">Sign-In</h1>
                            <input onChange={(eo) => { setUserName(eo.target.value) }} type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                            <input onChange={(eo) => { setEmail(eo.target.value) }} required type="email" placeholder="Email" />
                            <input onChange={(eo) => { setPassword(eo.target.value) }} required type="password" placeholder="Password" />

                            {/* btn-Sign-Up */}
                            <button onClick={(eo) => {
                                eo.preventDefault();
                                createUserWithEmailAndPassword(auth, email, password)
                                    .then((userCredential) => {

                                        // Signed up 
                                        // const user = userCredential.user;
                                        sendEmailVerification(auth.currentUser)
                                        

                                        updateProfile(auth.currentUser, {
                                            displayName: userName, photoURL: "https://example.com/jane-q-user/profile.jpg"
                                        }).then(() => {
                                            // Profile updated!
                                            navigate("/")
                                            // ...
                                        }).catch((error) => {
                                            // An error occurred
                                            console.log(error.code)
                                            // ...
                                        });





                                        console.log("Done")

                                        // ...
                                    })
                                    .catch((error) => {
                                        // const errorCode = error.code;
                                        // const errorMessage = error.message;
                                        console.log("Error")
                                        // ..
                                    })
                            }}>Sign-Up</button>
                            {/* btn-Sign-Up END */}

                            <p className="pLink">You have an account <Link to="/Signin">Signin</Link></p>
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        );
    }



    
   


}

export default Signup;
