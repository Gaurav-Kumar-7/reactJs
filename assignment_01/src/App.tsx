import { useEffect, useState } from "react";
import "./App.css";
import { TaskProvider } from "./shared/contexts";
import { AddTask, DisplayTask } from "./component";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function App() {
  const [tasks, setTasks] = useState<any[]>([]);

  const addTask = (task: any) => {
    setTasks((item: any) => [{ id: Date.now(), ...task }, ...item]);
    console.log("Ramayan", tasks);
  };

  const updateTask = (id: any, task: any) => {
    setTasks((prev: any) =>
      prev.map((prevTask: any) => (prevTask.id === id ? task : prevTask))
    );
  };
  const updateStatus = (id: any, status: any) => {
    setTasks((prev: any) =>
      prev.map((prevStatus: any) =>
        prevStatus.id === id ? status : prevStatus
      )
    );
  };
  const deleteTask = (id: any) => {
    setTasks((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const taskCompleted = () => {};

  useEffect(() => {
    const allTasksString = localStorage.getItem("allTask");
    if (allTasksString) {
      const allTasks = JSON.parse(allTasksString);
      if (Array.isArray(allTasks) && allTasks.length > 0) {
        setTasks(allTasks);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allTask", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskProvider
      value={{ tasks, addTask, updateTask, deleteTask, updateStatus }}
    >
      <div style={{ minHeight: "calc(100vh - 130px)", padding: "30px" }}>
        <div>
          <AddTask />
        </div>
        <div className="pt-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left" style={{paddingLeft: "30px"}}>Status</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          {/* <DisplayTask task={tasks}/> */}
          {tasks.map((task: any) => (
            <div key={task.id}>
              <DisplayTask task={task} />
            </div>
          ))}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
