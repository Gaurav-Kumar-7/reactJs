import { configureStore } from "@reduxjs/toolkit";
import taskreducer from './../shared/features/tasks/tasksSlice'


export const store = configureStore({
    reducer: taskreducer
})