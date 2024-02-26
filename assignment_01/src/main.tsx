import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout />}>
      <Route path='/' element={<App />} />
    </Route>
  )

)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
