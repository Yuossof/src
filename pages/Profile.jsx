import React, { useEffect } from 'react';
import Header from '../components/header';
import Loading from '../components/loading/Loading';
import {updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Moment from 'react-moment';
import { deleteUser } from 'firebase/auth';


const Profile = () => {
    
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user && !loading) {
            navigate("/")
        }
        if (user) {
            if (!user.emailVerified) {
                navigate("/")
            }
        }
    })




    if (loading) {
        return (
            <div className='mothLoad'>
                <Loading />
            </div>
        )
    }

    if (error) {

        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    if (user) {
      if(user.emailVerified){
        
        return (
            <>
                <div>
                    < Header />
                    <div style={{ marginTop: "90px" }}>
                        <div className='motherPr'>
                            <div className='ProfileBackG'>
                                {/* <ul>
                                <li><span>UserName: {user.displayName} </span></li>
                                <li><span>Email: {user.email}</span></li>
                            </ul> */}

                                <h3>Your Email:{user.displayName}</h3>
                                <h3>user Name:{user.email}</h3>
                                <h3>Last Sign-In:{<Moment fromNow date={user.metadata.lastSignInTime} />}  </h3>
                                <h3>Account Created:<Moment fromNow date={user.metadata.creationTime} /> </h3>
                                <button className='DeleteACC' onClick={()=>{
                                     const DeleteUser = window.confirm("Are You Sure")
                                     if(DeleteUser === true){
                                        deleteUser(user).then(()=>{
                                            console.log("User Deleted")
                                        }).catch((error)=>{
                                            console.log("User Not Deleted")
                                        })
                                     }

                                }}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
      }
    }

}



export default Profile;
