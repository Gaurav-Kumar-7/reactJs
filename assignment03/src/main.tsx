import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.tsx'
import LandingPage from './components/LandingPage/LandingPage.tsx'
import AddTask from './components/AddTask/AddTask.tsx'
import { store } from './app/store.tsx'
import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path='/' element={<LandingPage />} />
      <Route path='addTask' element={<AddTask />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
