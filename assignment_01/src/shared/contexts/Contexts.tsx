import { createContext, useContext } from "react";


export const TaskContext = createContext({
    tasks: [
        {
            id: 1,
            title: "Title",
            description: "Desc",
            completed: false
        }
    ],
    addTask: (task: any) => {},
    updateTask: (id: number, task: any) => {},
    updateStatus: (id: number, task: any) => {},
    deleteTask: (id: any) => {},

})

export const useTask = () => {
   return useContext(TaskContext)
}

export const TaskProvider = TaskContext.Provider;