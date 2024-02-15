import './App.css'
import UserContextProvider from './Context/UserContextProvider'
import Login from './assets/components/Login'
import Profile from './assets/components/Profile'

function App() {


  return (
    <UserContextProvider>
      <h1>Context Api</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
