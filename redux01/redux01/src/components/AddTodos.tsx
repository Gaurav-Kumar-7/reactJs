import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTudos } from "../features/todu/toduSlice"

function AddTodos() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch();

    const addTodoHandler = (e: any) => {
        e.preventDefault();
        dispatch(addTudos(input));
        setInput('');
    }


    return(
        <form action="" onSubmit={addTodoHandler}>
            <input type="text" placeholder="Enter Todos" value={input} 
            onChange={(e) => setInput(e.target.value)}/>
            <button>Add Todos</button>
        </form>
    )
}

export default AddTodos