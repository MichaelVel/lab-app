import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';

import Root from './routes/root';
import SignIn from './routes/login';
import SignUp from './routes/register';
import {action as LogOutAction} from './routes/logout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/users/register',
                element: <SignUp />,
            },
            {
                path: '/users/login',
                element: <SignIn />,
            },
            {
                path: '/users/logout',
                loader: LogOutAction,
            },
        ]
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
