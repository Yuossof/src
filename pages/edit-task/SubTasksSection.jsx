import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import Moment from 'react-moment'
//FIRESTORE DATABASE START
import { useDocument } from 'react-firebase-hooks/firestore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

// import { arrayRemove } from 'firebase/firestore';
//FIRESTORE DATABASE END

const SubTasksSection = ({ user, StrId, CompletedTask, TrashIcon, DeleteDoc }) => {
    const [value, loading, error] = useDocument(doc(db, user.uid, StrId))
    const [ ShowAddMoreTaskd, setShowAddMoreTaskd ] = useState(false)
    const [ SubTitle, setSubTitle ] = useState("")





    if (value) {
        return (
            <>
                <section className="sub-task">
                    <div className='tasks-box-mother'>
                        <p><Moment fromNow date={value.data().id} /></p>
                        <div className='head-of-checkbox-p'>
                            <label htmlFor="check" style={{ marginRight: '7px', cursor: "pointer" }}>Completed</label>
                            <input style={{ accentColor: "teal", cursor: "pointer" }} onChange={async (eo) => {
                                CompletedTask(eo)
                            }} checked={value.data().completed} id='check' type="checkbox" />
                        </div>
                    </div>

                    {ShowAddMoreTaskd &&
                        (
                        <div className='Add-More-Task'>
                            <input onChange={(eo)=>{
                                setSubTitle(eo.target.value)
                            }} value={SubTitle} type="text" placeholder='New Task' />
                            
                            <div>
                                <button onClick={async()=>{
                                     setSubTitle("")
                                    await updateDoc(doc(db, user.uid, StrId),{
                                        Details: arrayUnion(SubTitle)
                                    })
                                   
                                }} className='add'>Add</button>
                                <button onClick={()=>{
                                    setShowAddMoreTaskd(false)
                                    setSubTitle("")
                                }} className='cancel'>Cancel</button>
                            </div>
                        </div>
                        )
                    }


                    <div>
                        {value.data().Details.map((item) => {
                            return (
                                <ul key={item} className='ul'>
                                    <li className="li">
                                        <p>{item}</p>
                                        <FontAwesomeIcon onClick={ async ()=>{
                                            TrashIcon(item)
                                        }} style={{ opacity: "0.8" }} icon={faTrash} />
                                    </li>
                                </ul>
                            )
                        })}

                    </div>



                </section>




                <div className='BtnsEditTask'>
                    <button onClick={() => {
                        setShowAddMoreTaskd(true)
                    }} className='add-more-btn'>
                        Add More <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faAdd} />
                    </button>
                    <button onClick={(eo)=>{
                        DeleteDoc()
                    }} className='add-more-btn'>
                        Delete Task <FontAwesomeIcon style={{ fontSize: "14px", marginLeft: '5px' }} icon={faTrash} />
                    </button>
                </div>

            </>
        )
    }

}

export default SubTasksSection;
