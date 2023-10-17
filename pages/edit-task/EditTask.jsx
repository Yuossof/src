import React from 'react';
import './editTask.css'
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faAdd} from '@fortawesome/free-solid-svg-icons'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import Loading from '../../components/loading/Loading';

const EditTask = () => {
    // const [value, loading, error] = useCollection(collection(db, ))
    const [user, loading, error] = useAuthState(auth)



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
                        <section className='title'>
                            <h1>
                                <input className='title-input' type="text" />
                                <FontAwesomeIcon style={{ fontSize: "20px", marginLeft: "20px" }} icon={faEdit} />
        
                            </h1>
                        </section>
        
                        {/* sub-tasks section */}
        
                        <section className="sub-task">
                            <div className='tasks-box-mother'>
                                <p>a day ago</p>
                                <div className='head-of-checkbox-p'>
                                    <label htmlFor="check" style={{marginRight: '7px'}}>Completed</label>
                                    <input id='check' type="checkbox" />
                                </div>
                            </div>
        
        
                            <div>
                                <div>
                                    <ul className='ul'>
                                        <li className="li">
                                            <p>Task</p>
                                            <FontAwesomeIcon style={{ opacity: "0.8" }} icon={faTrash} />
                                        </li>
                                    </ul>
                                </div>
        
                                <div>
                                    <ul className='ul'>
                                        <li className="li">
                                            <p>Task</p>
                                            <FontAwesomeIcon style={{ opacity: "0.8" }} icon={faTrash} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
        
                        </section>
        
                        {/* Add-more BTN && Delete BTN */}
                        <section>
                            <div className='test'>
                                <button className='add-more-btn'>
                                    Add More <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faAdd} />
                                </button>
                                <button className='add-more-btn'>
                                    Delete Task <FontAwesomeIcon style={{fontSize: "14px", marginLeft: '5px'}} icon={faTrash} />
                                </button>
                            </div>
                        </section>
        
                    </div>
        
                </div>
            )
        }
    }

}

export default EditTask;
