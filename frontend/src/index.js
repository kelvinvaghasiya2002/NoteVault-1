import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp.jsx';
import LoginProvider from './contexts/Login.jsx';
import Calendar from './components/Calendar/Calendar.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element : <LoginProvider > <App /> </LoginProvider>
  },
  {
    path:"/sign-in",
    element : <LoginProvider> <SignIn /> </LoginProvider>
  },
  {
    path : "/sign-up",
    element : <LoginProvider><SignUp /></LoginProvider>
  },
  {
    path: "/to-do",
    element : <LoginProvider> <Calendar /> </LoginProvider>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);


