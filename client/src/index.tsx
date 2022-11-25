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
import SignUp, { action as registerAction } from './routes/register';
import SearchChallenge, {
  action as searchAction,
  loader as searchLoader,
} from './routes/search';
import CreateChallenge, { action as createAction } from './routes/create-challenge';
import Challenge, {
  action as challengeAction,
  loader as challengeLoader,
} from './routes/challenge';

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
          action: registerAction,
        },
        {
          path: '/users/login',
          element: <SignIn />,
        },
        {
          path: '/challenges/search',
          element: <SearchChallenge />,
          action: searchAction,
          loader: searchLoader,
        },
        {
          path: '/users/:id/create-challenge',
          element: <CreateChallenge />,
          action:  createAction,
        },
        {
          path: '/challenges/:id',
          element: <Challenge />,
          loader: challengeLoader,
          action: challengeAction,
          id: 'challenge',
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

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
