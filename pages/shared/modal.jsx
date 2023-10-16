import React from 'react';
import './modaStyle.css'
// import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../FrSignin.css'
const Modal = ({children, closeForm}) => {
    return (
        <>
            <div className='modal-container'>
                <form className='Modal-Form'>
                    <div className='Mother-of-Element-modal'>
                        <div onClick={()=>{
                           closeForm()
                        }} className="close">
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                           
                           {children}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Modal;
