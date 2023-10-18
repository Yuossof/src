import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import Moment from 'react-moment';

//fireStore
import { db } from '../../firebase/config';
import Loading from '../../components/loading/Loading';
//fireStore
const AllTasksSection = ({ user }) => {
    const [value, loading, error] = useCollection(collection(db, user.uid));


    if (error) {
        return (
            <h1>Error</h1>
        )
    }

    if (loading) {
        return (
            <div className='mothLoadSmall'>
                <Loading />
            </div>
        )
    }

    if (value) {

        return (

            <section className="flex all-tasks">

                {value.docs.map((item) => {
                    return (
                        <div key={item.data().id} className="first-task">
                            <Link to={`edit-task/${item.data().id}`}>
                                <h2>{item.data().title}</h2>
                                <ul>
                                    {item.data().Details.map((item, index)=>{
                                      if(index < 2){
                                        return(
                                            <li key={item}>{item}</li>
                                        )
                                      }else{
                                        return false
                                      }

                                    })}
                                </ul>
                                <p className="time"><Moment fromNow date={user.metadata.lastSignInTime} /></p>
                            </Link>
                        </div>
                    )
                })}


            </section>

        )
    }
}

export default AllTasksSection;
