import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './editTask.css'

//FIRESTORE DATABASE START
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
//FIRESTORE DATABASE END



const BtnsSection = ({user, StrId}) => {
    const [value, loading, error] = useCollection(collection(db, user.uid))
    return (
        <section>
            <div className='BtnsEditTask'>
                <button className='add-more-btn'>
                    Add More <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faAdd} />
                </button>
                <button className='add-more-btn'>
                    Delete Task <FontAwesomeIcon style={{ fontSize: "14px", marginLeft: '5px' }} icon={faTrash} />
                </button>
            </div>
        </section>
    );
}

export default BtnsSection;
