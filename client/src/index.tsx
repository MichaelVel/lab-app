import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import './index.css';
//import reportWebVitals from './reportWebVitals';

import Root from './routes/root';
import SignIn from './routes/login';
import SignUp from './routes/register';
import {action as LogOutAction} from './routes/logout';
import SearchChallenge from './routes/search';
import {User, UserContext} from './context/user';
import CreateChallenge from './routes/create-challenge';

import ListInput from './main/inputs/input-list';
import {Input, TextField} from '@mui/material';

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
            {
                path: '/challenges',
                element: <SearchChallenge />,
            },
            {
                path: '/users/:id/create-challenge',
                element: <CreateChallenge />,
            },
            {
                path: '/test',
                element: <form>
                    <TextField disabled name="AAA" value="BBB" />
                    <Input name="aaa" value="bbb"/>
                    <button>submit</button>
                </form> 
                ,
            },
        ]
    },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Testing purposes
const aUser: User = {
    name: 'anonymous',
    rol: 'Anonymous',
}

const user1: User = {
    name: 'Student',
    rol: 'Student',
}

const user2: User = {
    name: 'Instructor',
    rol: 'Instructor',
}

root.render(
  <React.StrictMode>
    <UserContext.Provider value={user2}>
        <RouterProvider router={router} />
    </UserContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
