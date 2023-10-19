import React, { useState } from 'react';
import './editTask.css'
import { Helmet } from 'react-helmet-async';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
//SECTIONS START
import Loading from '../../components/loading/Loading';
import Header from '../../components/header'
import TitleSection from './TitleSection';
import SubTasksSection from './SubTasksSection';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


//SECTIONS END
import { arrayRemove } from 'firebase/firestore';

const EditTask = () => {
    const [user, loading, error] = useAuthState(auth)
    let { StrId } = useParams();
    console.log(StrId)

    const [sowData, setSohwData] = useState(false)

    const navigate = useNavigate();

    //FUNCTIONS START
    const ChangeInputTitle = async (eo) => {
        await updateDoc(doc(db, user.uid, StrId), {
            title: eo.target.value === "" ? "Task Name?!" : eo.target.value
        })
    }
    const CompletedTask = async (eo) => {
        if (eo.target.checked) {
            await updateDoc(doc(db, user.uid, StrId), {
                completed: true
            })
        } else {
            await updateDoc(doc(db, user.uid, StrId), {
                completed: false
            })
        }
    }
    const TrashIcon = async (item) => {
        await updateDoc(doc(db, user.uid, StrId), {
            Details: arrayRemove(item)
        })
    }
    const DeleteDoc = async () => {
        setSohwData(true)
        await deleteDoc(doc(db, user.uid, StrId))
        navigate("/")


    }
    //FUNCTIONS END




    if (loading) {
        return (
            <div className='mothLoad'>
                <Loading />
            </div>
        )
    }



    if (error) {
        return <h1>Error: {error.message}</h1>
    }


    if (user) {
        if (user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        <title>Edit task Page</title>
                    </Helmet>
                    <Header aboutlink="www" />

                    {sowData ? (
                        <div className='mothLoad'>
                            <Loading />
                        </div>
                    ) :
                        (
                            <div className='edit-ask'>
                                {/* Title of task*/}
                                <TitleSection ChangeInputTitle={ChangeInputTitle} StrId={StrId} user={user} />


                                {/* sub-tasks section */}
                                <SubTasksSection DeleteDoc={DeleteDoc} TrashIcon={TrashIcon} CompletedTask={CompletedTask} StrId={StrId} user={user} />

                                {/* Add-more BTN && Delete BTN */}



                            </div>
                        )}



                </div>
            )
        }
    }

}

export default EditTask;
