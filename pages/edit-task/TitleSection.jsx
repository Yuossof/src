import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

//FIRESTORE DATABASE START
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LoadingforTasks from '../../components/loading/loadingforTasks';
//FIRESTORE DATABASE END


const TitleSection = ({ user, StrId }) => {
    const [value, loading, error] = useDocument(doc(db, user.uid, StrId))




    if (loading) {
        return (
            <div className='mothLoad'>
              <LoadingforTasks />
            </div>
        )
    }



    if (value) {
        return (

            <section className='title'>
                <h1>
                    <input defaultValue={value.data().title} className='title-input' type="text" />
                    <FontAwesomeIcon style={{ fontSize: "20px", marginLeft: "20px" }} icon={faEdit} />

                </h1>
            </section>

        )
    }
}

export default TitleSection;
