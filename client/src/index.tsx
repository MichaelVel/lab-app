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
import Challenge from './routes/challenge';

import VisibilityChip from './main/chips/visibility';
import StateChip from './main/chips/state';
import MenuChip from './main/chips/menu';
import OverviewSection from './routes/challenge_sections/overview';
import InstructionsSection from './routes/challenge_sections/instructions';
import ExplanatioSection from './routes/challenge_sections/instructor-solution';
import CommentsSection from './routes/challenge_sections/comments';

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
          path: '/challenges/search',
          element: <SearchChallenge />,
        },
        {
          path: '/users/:id/create-challenge',
          element: <CreateChallenge />,
        },
        {
          path: '/challenges/:id',
          element: <Challenge />,
          children: [
            {
              index: true,
              element: <OverviewSection/>,
            },
            {
              path: '/challenges/:id/instructions',
              element: <InstructionsSection />,
            },
            {
              path: '/challenges/:id/instructor-solution',
              element: <ExplanatioSection />,
            },
            { path: '/challenges/:id/comments',
              element: <CommentsSection />,
            },
          ],
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
