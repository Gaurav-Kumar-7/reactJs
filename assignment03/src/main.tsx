import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './components/login'
import Layout from './Layout'
import Home from './components/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout />}>
      <Route path='/' element={<Login />} />
      <Route path='landingPage' element={<Home />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
