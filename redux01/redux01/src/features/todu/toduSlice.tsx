import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tudos: [
        {
            id: 1,
            title: "Gauravvvvvvv"
        }
    ]
}

export const  todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTudos: (state, action) => {
            const todo: any = {
                id: nanoid(),
                title: action.payload
            }
            state.tudos.push(todo);
        },
        removeTudos: (state, action) => {
            state.tudos = state.tudos.filter((todo) =>  todo.id !==  action.payload)
        }
    }
})

export const {addTudos, removeTudos} = todoSlice.actions

export default todoSlice.reducer