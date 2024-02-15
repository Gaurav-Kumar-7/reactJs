import { useState, useContext } from "react"
import UserContext from "../Context/UserContext";


function Login() {
    const [userName, setUserName] = useState("");
    const [passWord, setPassword] = useState("");

    const {setUser} = useContext(UserContext)

    const handleClick = (e: any) => {
        e.preventDefault();
        setUser({userName, passWord})
    }
    return(
        <div>
            <h2>Login</h2>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Dalll"/>
            {" "}
            <input type="text" value={passWord} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
            <button onClick={handleClick}>
                Submit
            </button>
        </div>
    )
}

export default Login