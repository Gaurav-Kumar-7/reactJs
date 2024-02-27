import { useDispatch, useSelector } from "react-redux";
import { removeTudos } from "../features/todu/toduSlice";

function Todos() {
    const todos = useSelector((state: any) => state.tudos);
    const dispatch = useDispatch();

    return(
        <>
        <div style={{marginTop: "20px", color: "blue"}}>Todos :-</div>
        <ul>
            {todos.map((item: any) => (
                <li key={item.id} style={{display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "20px"}}>
                    <div>{item.title}</div>
                    <button onClick={() => dispatch(removeTudos(item.id))} 
                    style={{border: "1px solid red", borderRadius: "20px", color: "red", cursor: "pointer"}}>remove</button>
                </li>
            ))}
        </ul>
        </>
    )
}

export default Todos