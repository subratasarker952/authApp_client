import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Username from './components/pages/Username';
import Password from './components/pages/Password';
import Profile from './components/pages/Profile';
import Reset from './components/pages/Reset';
import Recovery from './components/pages/Recovery';
import Register from './components/pages/Register';
import Notfound from './components/pages/Notfound';
import { AuthorizeUser, AuthorizeUserName } from './middlewar/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/password',
    element: <AuthorizeUserName><Password/></AuthorizeUserName>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '*',
    element: <Notfound></Notfound>
  },

])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
