import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment'
//FIRESTORE DATABASE START
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
//FIRESTORE DATABASE END

const SubTasksSection = ({ user, StrId }) => {
    const [value, loading, error] = useDocument(doc(db, user.uid, StrId))


    if (value) {
        return (
            <section className="sub-task">
                <div className='tasks-box-mother'>
                    <p><Moment fromNow date={value.data().id} /></p>
                    <div className='head-of-checkbox-p'>
                        <label htmlFor="check" style={{ marginRight: '7px' }}>Completed</label>
                        <input checked={value.data().completed} id='check' type="checkbox" />
                    </div>
                </div>




                <div>
                    {value.data().Details.map((item) => {
                        return (
                            <ul key={item} className='ul'>
                                <li className="li">
                                    <p>{item}</p>
                                    <FontAwesomeIcon style={{ opacity: "0.8" }} icon={faTrash} />
                                </li>
                            </ul>

                        )
                    })}

                </div>


            </section>
        )
    }

}

export default SubTasksSection;
