import React from 'react';
import './editTask.css'
import { Helmet } from 'react-helmet-async';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';



//SECTIONS START
import Loading from '../../components/loading/Loading';
import Header from '../../components/header'
import TitleSection from './TitleSection';
import SubTasksSection from './SubTasksSection';
import BtnsSection from './BtnsSection';
import { useParams } from 'react-router-dom';
//SECTIONS END

const EditTask = () => {
    const [user, loading, error] = useAuthState(auth)
    let { StrId } = useParams();

    console.log(StrId)


    if (loading) {
        return (
           <div className='mothLoad'>
              <Loading />
           </div>
        )
     }



     if(error){
        return <h1>Error: {error.message}</h1>
     }


    if(user){
        if(user.emailVerified){
            return (
                <div>
                    <Helmet>
                        <title>Edit task Page</title>
                    </Helmet>
                    <Header aboutlink = "www" />
        
                    <div className='edit-ask'>
                        {/* Title of task*/}
                        <TitleSection StrId={StrId} user={user}/>

        
                        {/* sub-tasks section */}
                        <SubTasksSection StrId={StrId} user={user}/>

                        {/* Add-more BTN && Delete BTN */}
                        <BtnsSection StrId={StrId} user={user}/>

        
                    </div>
        
                </div>
            )
        }
    }

}

export default EditTask;
