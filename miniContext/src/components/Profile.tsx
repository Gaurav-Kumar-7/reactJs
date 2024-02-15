import { useContext } from "react"
import UserContext from "../Context/UserContext"
import UserContextProvider from "../Context/UserContextProvider";


function Profile() {

    const {user} = useContext(UserContext);

    if(!user) return <div>Please Login!!</div>
    
    return(
        <UserContextProvider>
            <h1>Welcome  {user ? user.userName: ""} {""} {user ? user.passWord: ""} </h1> 
        </UserContextProvider>
    )
}

export default Profile