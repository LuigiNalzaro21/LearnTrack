import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/main';
import Signin from './pages/signin';
import Signup from './pages/signup';
import User from './pages/user';
import Add from './pages/add';
import View from './pages/view';
import View2 from './pages/view2';
import Evaluate from './pages/evaluate';
import Form from './pages/form';
import Questions from './pages/questions';
import Sheets from './pages/sheets';

const router = createBrowserRouter([
  {
    path: "/main",
    element: <Main/>
  },

  {
    path: "/",
    element: <Signin/>
  },

  {
    path: "/user",
    element: <User/>
  },

  {
    path: "/signup",
    element: <Signup/>
  },

  {
    path: "/add",
    element: <Add/>
  },

  {
    path: "/view",
    element: <View/>
  },

  {
    path: "/view2",
    element: <View2/>
  },

  {
    path: "/evaluate",
    element: <Evaluate/>
  },

  {
    path: "/form",
    element: <Form/>
  },

  {
    path: "/questions",
    element: <Questions/>
  },

  {
    path: "/sheets",
    element: <Sheets/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
