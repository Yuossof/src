import React from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import Loading from "../components/loading/Loading";
import MainContent from "../components/mainContent";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const About = () => {

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if(!user.emailVerified){
        navigate("/")
      }
    }
  })

  if(loading){
    return (
      <div className='mothLoad'>
          <Loading />
      </div>
  )
  }


  if (user) {

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About page</title>
            <meta
              name="description"
              content="menuuuuuu"
            />
            {/* <link rel="canonical" href="https://www.tacobell.com" /> */}
          </Helmet>

          <Header />
          <MainContent pageName="Menu" NameOfdes="youssof" />
          <Footer />
        </>
      );
    }
  }

};

export default About;
