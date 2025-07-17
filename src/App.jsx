import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Components/Layout/AppLayout';
import Login from './features/auth/Login';
import SignupForm from './features/auth/SignupForm';
import DiscriptionHandler from './features/quran/DiscriptionHandler';
import SurahInfo from './features/quran/SurahInfo';
import Cource from './pages/Cources';
import ErrorPage from './Pages/ErrorPage';
import ForumComponent from './pages/Forum';
import Home from './pages/Home';
import QuestionList from './pages/Q&A';
import Quran from './pages/Quran';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Use AppLayout as the main layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />, // Render Home component
      },
      {
        path: '/quran',
        element: <Quran />,
      },

      /* Dynamic route to handle multiple descriptions */
      {
        path: '/quran/:type/:id',
        element: <DiscriptionHandler />,
      },

      {
        path: '/questionList',
        element: <QuestionList />,
      },

      {
        path: '/quran/:id/info',
        element: <SurahInfo />,
      },
      {
        path: '/cource',
        element: <Cource />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signupForm',
        element: <SignupForm />,
      },
      {
        path: '/forumComponent',
        element: <ForumComponent />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
