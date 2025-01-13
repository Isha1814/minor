import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Main from './main';
import Quiz from './quiz';
import Result from './result';
import { CheckUserExist } from '../helper/helper';

const router = createBrowserRouter(
  [
    {
      path :'/',
      element : <Main></Main>
    },
    {
      path :'/quiz',
      element : <CheckUserExist><Quiz/></CheckUserExist>
    },
    {
      path :'/result',
      element : <CheckUserExist><Result/></CheckUserExist>
    },
  ]
)

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
