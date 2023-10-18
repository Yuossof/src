import React, { useState } from "react";
import Header from "../../components/header";

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
// end font awesome

// import MainContent from "../components/mainContent";
import { Helmet } from "react-helmet-async";
import './homeStyle.css'

import { useContext } from "react";
import ThemeContexttt from "../../Context/DataContext";
// import Datacontext from "../context/Datacontext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../../components/loading/Loading";
import LoadingSmall from "../../components/loading/loadingSmall";
// import { useState } from "react";
import ErrorPage from '../ErrorPage';
import Modal from "../shared/modal";
import AllTasksSection from "./AllTasksSection";
//FIREBASE db
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";
//FIREBASEdb





const Home = () => {

   


   const [TasksArr, setTasksArr] = useState([])
   const [subTask, setSubtask] = useState("")


   const [taskExists, setTaskExists] = useState(false)
   const addBTNdetails = () => {
   
       if(!TasksArr.includes(subTask)){
         TasksArr.push(subTask)
         setTaskExists(false)
       }else{
         setTaskExists(true)
       }
      setSubtask("")

   }

   const [TaskTitle, setTaskTitle] = useState("")


   const [user, loading, error] = useAuthState(auth)
   // const navigate = useNavigate();
   console.log(user)
   const [showForm, setShowForm] = useState(false)



   const [LoadingSubmit, setLoadingSubmit] = useState(false)
   const closeForm = () => {
      setShowForm(false)
      setTasksArr([])
      setTaskTitle("")
   }

   const [showMessage, settshowMessage] = useState(false)

   const { theme } = useContext(ThemeContexttt)



   if (error) {
      return <ErrorPage />;

   }


   if (loading) {
      return (
         <div className='mothLoad'>
            <Loading />
         </div>
      )
   }



   if (!user) {
      return (
         <>
            <Helmet>
               <title>Home Page</title>
               <meta name="description" content="hoooome" />



               {/*Write Css in Helmet*/}
               {/* <style type="text/css">{`
                 
                      
                 
                 
                 `}</style> */}
               {/*End Style Helmet*/}
            </Helmet>

            <div className={`${theme}`}>
               <Header />
               {/* {user && <MainContent pageName="Home" />} */}


               <div className="GetstartedDiv">
                  <Link to="/Signup">Get Started</Link>
               </div>




            </div>


         </>


      );
   }


   //===Worked Now===//
   if (user) {
      if (user.emailVerified) {
         return (
            <>
               <Helmet>
                  <title>Home Page</title>
               </Helmet>
               <Header />
               <main className="home">




                  {showForm &&
                     <Modal closeForm={closeForm}>
                        <div className="container-of-modal-tag">

                         
                              <div className="mother-of-modal-tag">

                                 <div>
                                    <input value={TaskTitle} onChange={(eo) => {
                                       setTaskTitle(eo.target.value)
                                    }} type="text" placeholder='Add Task' />

                                    <input value={subTask} onChange={(eo) => {
                                       setSubtask(eo.target.value)

                                    }} type="text" placeholder='Details' />
                                   {taskExists &&  <p style={{color: "red", fontSize: "16px",}}>This task already exists!</p>}
                                 </div>
                                 <div>
                                    <button onClick={(eo) => {
                                       eo.preventDefault()
                                       addBTNdetails()
                                    }}>Add Details</button>
                                    <button onClick={async (eo) => {
                                       eo.preventDefault()

                                       //====SEND DATA TO FIREBASE DATABASE====//
                                       const taskIDandData = new Date().getTime()
                                       console.log('wait')
                                       setLoadingSubmit(true)

                                       await setDoc(doc(db, `${user.uid}`, `${taskIDandData}`), {
                                          title: TaskTitle,
                                          Details: TasksArr,
                                          id: taskIDandData,
                                          completed: false
                                       });

                                       closeForm()
                                       setLoadingSubmit(false)
                                       setTasksArr([])
                                       setTaskTitle("")
                                       console.log('done')
                                       settshowMessage(true)
                                       setTimeout(() => {
                                          settshowMessage(false)
                                       }, 4000)



                                    }}>{LoadingSubmit ? <LoadingSmall /> : "Submit"}
                                    </button>

                                 </div>
                              </div>

                              <div className="mother-of-ulli-tasks">
                                 <ul>
                                    {TasksArr.map((item) => (
                                       <li key={item}>{item}</li>
                                    ))}
                                 </ul>
                              </div>
                           </div>

                 


                     </Modal>
                  }
                  <p style={{ right: showMessage ? "10px" : "-32vw" }} className="task-show-mass">Task added successfully <FontAwesomeIcon className="check" icon={faCircleCheck} /></p>








                  {/* Options And Create New List */}
                  <section className="flex parent-of-btns">
                     {/* btns */}

                     <button>Newest</button>
                     <button>Oldest</button>
                     {/* End btns */}

                     {/* Select optons */}
                     <select id="browsers">
                        <option value="Chrome">All Tasks</option>
                        <option value="Firefox">Complated</option>
                        <option value="Opera">Not Complated</option>
                     </select>
                     {/* End Select optons */}
                  </section>



                  {/* Show All Tasks */} 
                  <AllTasksSection user={user}/>
                  


                  {/* Btn Add New Task */}
                  <section>
                     <button onClick={() => {
                        setShowForm(true)
                     }} className="add-task-btn">Add New Task <FontAwesomeIcon style={{ marginLeft: "3px" }} icon={faPlus} /></button>
                  </section>
               </main>
            </>
         )
      }
      //===Worked Now===//


      if (!user.emailVerified) {
         return (
            <>
               <Helmet>
                  <title>Home Page</title>
                  <meta name="description" content="hoooome" />



                  {/*Write Css in Helmet*/}
                  {/* <style type="text/css">{`
                    
                         
                    
                    
                    `}</style> */}
                  {/*End Style Helmet*/}
               </Helmet>

               <div className={`${theme}`}>
                  <Header />
                  {/* {user && <MainContent pageName="Home" />} */}


                  <div className="Box-all-Data-Home">
                     <h1>Welcome <span style={{ color: "brown" }}>{user.displayName}</span></h1>
                     <div className="Box-Verify">
                        <p>We Send You An Email To Verify Your Account</p>
                        <button onClick={() => {
                           sendEmailVerification(auth.currentUser)
                              .then(() => {
                                 console.log("done")
                              })
                              .catch((error) => {
                                 const errorCode = error.code;

                                 if (errorCode === "auth/too-many-requests") {
                                    console.log("waite...")
                                 }
                              })
                        }}>Send Again</button>
                     </div>
                  </div>







               </div>


            </>


         );
      }
   }


};

export default Home;
