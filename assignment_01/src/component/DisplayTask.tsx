import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTask } from "../shared/contexts";
import { useState } from "react";
import './DisplayTask.css';
import { Checkbox } from "@mui/material";


function DisplayTask({task}: { task: any}) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [isTaskEditable, setIsTaskEditable] = useState(false);
    const [NewTitle, setNewTitle] = useState(task.title)
    const [NewStatus, setNewStatus] = useState(task.complete)
    const {updateTask, deleteTask, updateStatus} = useTask();

    const editTask = () => {
        updateTask(task.id, {...task, title: NewTitle})
        updateStatus(task.id, {...task, complete: NewStatus})
        setIsTaskEditable(false)
      }

      const handleChange = (e: any) => {
        e.preventDefault();
        setNewTitle(e.target.value)
      }
      const handleChangeCheckBox = (e: any) => {
        e.preventDefault();
        setNewStatus(e.target.checked)
      }

  return (
    <div>
      {/* '
      <TableContainer component={Paper}> */}
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          {/* <caption>All Task Details</caption>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Edit Task</TableCell>
              <TableCell align="right">Delete Task</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {/* {task.map((row:any) => ( */}
              <TableRow style={task.complete ? {backgroundColor:"#dadada"}: {backgroundColor: "#ffffff"}}>
                <TableCell>
                  <input style={task.complete ? {backgroundColor:"#dadada"}: {backgroundColor: "#ffffff"}} className="tableInput w-100" type="text" value={NewTitle} readOnly={!isTaskEditable} 
                  onChange={handleChange}/>
                </TableCell>
                <TableCell align="right">{task.desc}</TableCell>
                <TableCell align="right">
                    <Checkbox {...label} defaultChecked={task.complete} 
                    onChange={handleChangeCheckBox}
                     disabled={!isTaskEditable}/>
                  {NewStatus ? "Complete" : "Incomplete"}
                </TableCell>
                <TableCell align="right" style={{cursor: "pointer"}}  
                >
                <a
                onClick={() => {
                    if (isTaskEditable) {
                        editTask();
                    } else setIsTaskEditable((prev) => !prev);
                }}
                >{isTaskEditable ? "📁" : "✏️"}</a>
                </TableCell>
                <TableCell align="right" style={{cursor: "pointer"}} onClick={() => deleteTask(task.id)}>
                ❌
                </TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      {/* </TableContainer> */}
    </div>
  );
}

export default DisplayTask;
