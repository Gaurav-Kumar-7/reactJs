import { createSlice, nanoid } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  taskName: string;
  disc: string;
  category: string;
  priority: string;
  value: string;
  complete: boolean;
}

interface InitialState {
  allTasks: Task[];
}

const initialState: InitialState = {
  allTasks: [],
};

export const taskSlice = createSlice({
  name: "allTask",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task: any = {
        id: nanoid(),
        taskName: action.payload.taskName,
        disc: action.payload.disc,
        category: action.payload.category,
        priority: action.payload.priority,
        value: action.payload.value,
        complete: action.payload.complete,
      };
      state.allTasks.push(task);
      const tasksToStore = state.allTasks;
      localStorage.setItem("allTask", JSON.stringify(tasksToStore));
    },
    removeTask: (state, action) => {
      state.allTasks = state.allTasks.filter(
        (item) => item.id !== action.payload
      );
      const tasksToStore = state.allTasks;
      localStorage.setItem("allTask", JSON.stringify(tasksToStore));
    },
    updateTask: (state, action) => {
      const updatedTasks = state.allTasks.map((task) => {
        const updatedTask = action.payload.find(
          (item: any) => item.id === task.id
        );
        if (updatedTask) {
          return { ...task, ...updatedTask };
        }
        return task;
      });
      state.allTasks = updatedTasks;
      localStorage.setItem("allTask", JSON.stringify(updatedTasks));
    },
    updateDisc: (state, action) => {
      const uddatedDiscs = state.allTasks.map((disc) => {
        const updatedDisc = action.payload.find(
          (item: any) => item.id === disc.id
        );
        if (updatedDisc) {
          return { ...disc, ...updatedDisc };
        }
        return disc;
      });
      state.allTasks = uddatedDiscs;
      localStorage.setItem("allTask", JSON.stringify(uddatedDiscs));
    },
    updateCategory: (state, action) => {
      const updatedCategories = state.allTasks.map((category) => {
        const updatedPrio = action.payload.find(
          (item: any) => item.id === category.id
        );
        if (updatedPrio) {
          return { ...category, ...updatedPrio };
        }
        return category;
      });
      state.allTasks = updatedCategories;
      localStorage.setItem("allTask", JSON.stringify(updatedCategories));
    },
    updatePriority: (state, action) => {
      const updatedPriorities = state.allTasks.map((priority) => {
        const updatedPriority = action.payload.find(
          (item: any) => item.id === priority.id
        );
        if (updatedPriority) {
          return { ...priority, ...updatedPriority };
        }
        return priority;
      });
      state.allTasks = updatedPriorities;
      localStorage.setItem("allTask", JSON.stringify(updatedPriorities));
    },
    updateStstus: (state: any, action) => {
      const updatedStatus = state.allTasks.map((status: any) => {
        const updatedSt = action.payload.find(
          (item: any) => item.id === status.id
        );
        if (updatedSt) {
          return { ...status, ...updatedSt };
        }
        return status;
      });
      state.allTasks = updatedStatus;
      localStorage.setItem("allTask", JSON.stringify(updatedStatus));
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  updateDisc,
  updateCategory,
  updatePriority,
  updateStstus,
} = taskSlice.actions;

export default taskSlice.reducer;
