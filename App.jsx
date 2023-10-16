import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from './pages/Home/home';
import About from "./pages/About";
import { useContext } from "react";
import ThemeContexttt from "./Context/DataContext";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import EditTask from './pages/edit-task/EditTask.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },

  {
    path: "/About",
    element: <About />,
    
    
  },
  {
    path: "/Signin",
    element: <Signin />
  },
  {
    path: "/Signup",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/edit-task",
    element: <EditTask />
  }
]);

function App() {
  console.error("هناك خطأ تطط")

  const {theme} = useContext(ThemeContexttt)
  return (
    <div className={`App ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
