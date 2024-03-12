import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element : <App />
  },
  {
    path:"/sign-in",
    element : <SignIn />
  },
  {
    path : "/sign-up",
    element : <SignUp />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);


