import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todu/toduSlice'

export const store = configureStore({
    reducer: todoReducer
})  