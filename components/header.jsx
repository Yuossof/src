//====FONT AWESOME====//
//===//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//===//


import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

//====FONT AWESOME====//












import React from "react";
import {  NavLink } from "react-router-dom";
import { useContext } from "react";
import ThemeContexttt from "../Context/DataContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import Loading from './loading/Loading';





const Header = () => {
  




  const [user, loading, error] = useAuthState(auth)


  const { changeTheme, theme } = useContext(ThemeContexttt)

if(loading){
  return(
    <Loading />
  )
}
  

  return (


    <div className="container">

      <div className="mother">


        <div className="contLink">

          <div className="DarkAndLight">
            <button onClick={() => changeTheme(theme === "Light" ? "Dark" : "Light")} className="btnDL">{theme}</button>
          </div>






          {user &&
            <button className="SignOut" onClick={() => {
              const conf = window.confirm("Are you sure you want to log out?")

              if (conf === true) {
                signOut(auth).then(() => {
                  console.log("don")
                }).catch((error))
              }


            }}>
          
              <span>LogOut <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "15px" }} /></span>
            </button>
          }





          {user &&

            <NavLink className="main-link" to="/profile">
              Profile
            </NavLink>
          }


          {user &&
            <NavLink className={`main-link`} to="/about">
              About
            </NavLink>
          }










          {user &&
            <NavLink className="main-link" to="/">
              Home
            </NavLink>
          }



          {/* Sign-Up&Signin&SignOut */}

          {!user && <NavLink className="main-link2" to="../Signin">
            Signin
          </NavLink>
          }

          {!user &&
            <NavLink className="main-link2" to="../Signup">
              Signup
            </NavLink>
          }



        </div>


        <h1 className="nav">Nav</h1>
        
      </div>
    </div>
  );
  
};

export default Header;
