import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'    // add this
import About from './components/About/About.jsx'  // and this (create if missing)
import Contact from './components/Contact/Contact.jsx' // and this (create if missing)
import User from './components/User/User.jsx'    // and this (create if missing)
import Github, {githubLoader} from './components/Github/Github.jsx' // and this (create if missing)

// Option 1: Using createBrowserRouter
// This is the recommended way to set up routing in React Router v6.4 and later
// It allows you to define routes in a more structured way, including nested routes.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'contact',
        element: <Contact/>
      },
      {
        path: 'user/:userid',
        element: <User/>
      },
      {
        loader: githubLoader, // This will fetch data before rendering the component
        path: 'github',
        element: <Github/>
      }
    ]
  }
])

// Option 2: Using createRoutesFromElements
// This is an alternative way to define routes, which can be useful for more complex routing scenarios
// import { createRoutesFromElements, Route } from 'react-router-dom';
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout/>}>
//       <Route path="" element={<Home/>} />
//       <Route path="about" element={<About/>} />
//       <Route path="contact" element={<Contact/>} />
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
