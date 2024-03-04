import "../../App.css";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { addTask } from "../../shared/features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function AddTask() {
  const history = useNavigate();
  const dispatch = useDispatch();
  //   const [formsData, setFormsData] = useState({
  //     taskName: "",
  //     discription: "",
  //     category: "",
  //     due_date: "",
  //     priority: "",
  //     status: false,
  //   });
  const [taskName, setTaskName] = useState("");
  const [disc, setDisc] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [value, setValue] = useState<Dayjs | null>(null);
  const [complete, setComplete] = useState(Boolean);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  function validators() {
    if (!taskName || !disc || !category || !value || !priority) {
      setError(true);
      setError1(true);
      setError2(true);
      setError3(true);
      setError4(true);
      return;
    }
  }

  const handleTaskName = (e: any) => {
    setError(false);
    setTaskName(e.target.value);
  };

  const handleDisc = (e: any) => {
    setError1(false);
    setDisc(e.target.value);
  };

  const handleDueDate = (evt: any) => {
    const newDate = evt.$d;
    if (dayjs(newDate).isValid()) {
      setValue(newDate.toISOString());
      setError4(false);
    } else {
      setError4(true);
      setValue(null);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setError2(false);
    setCategory(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setError3(false);
    setPriority(event.target.value);
  };

  const handleCheckbox = () => {
    setComplete(!complete);
  };

  const handleOpenDialog = () => {
    if (!taskName || !disc || !category || !value || !priority) {
      validators();
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleaddTasks = (e: any) => {
    if (e === "prev") {
      addTasks();
      setOpenDialog(false);
      setOpen(true);
    } else if (e === "next") {
      addTasks();
      history("/");
      setOpenDialog(false);
    }
  };

  function addTasks() {
    validators();
    const taskData = {
      taskName: taskName,
      disc: disc,
      category: category ? category : "None",
      priority: priority ? priority : "None",
      value: value,
      complete: complete,
    };
    dispatch(addTask(taskData));
    setTaskName("");
    setDisc("");
    setCategory("");
    setPriority("");
    setValue(null);
    setComplete(false);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (event) {
      event.preventDefault();
    }
    setOpen(false);
  };

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-header">Add Task</div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-4 col-md-4 col-12 task">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                id="standard-basic"
                label="Task Name"
                name="taskName"
                value={taskName}
                onChange={handleTaskName}
                error={error}
                helperText={error ? "Value is required" : ""}
              />
            </div>
            <div className="col-xl-4 col-md-4 col-12 task">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                id="standard-basic"
                label="Discription"
                name="discription"
                value={disc}
                onChange={handleDisc}
                error={error1}
                helperText={error1 ? "Value is required" : ""}
              />
            </div>
            <div
              className="col-xl-4 col-md-4 col-12"
              style={{ paddingTop: "8px" }}
            >
              <FormControl className="w-100">
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                  name="category"
                  error={error2}
                >
                  <MenuItem value={"none"}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Priority"}>Priority</MenuItem>
                  <MenuItem value={"Due Date"}>Due Date</MenuItem>
                </Select>
                {error2 && (
                  <FormHelperText>
                    <span style={{ color: "#da3f2f" }}>Value is required</span>
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="col-xl-4 col-md-4 col-12 pt-3">
              <FormControl variant="standard" className="w-100">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Due Date"
                      name="due_date"
                      value={value}
                      onChange={handleDueDate}
                    />
                  </DemoContainer>
                  {error4 && (
                    <FormHelperText>
                      <span style={{ color: "#da3f2f" }}>Invalid Date</span>
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </FormControl>
            </div>
            <div
              className="col-xl-4 col-md-4 col-12 pt-4"
              style={{ paddingTop: "8px" }}
            >
              <FormControl className="w-100">
                <InputLabel id="demo-simple-select-standard-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priority}
                  onChange={handlePriorityChange}
                  label="Priority"
                  name="priority"
                  error={error3}
                >
                  <MenuItem value={"none"}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
                {error3 && (
                  <FormHelperText>
                    <span style={{ color: "#da3f2f" }}>Value is required</span>
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="col-xl-4 col-md-4 col-12 pt-4">
              <FormGroup style={{ marginTop: "25px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="status"
                      checked={complete}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Completed"
                />
              </FormGroup>
            </div>
            <div className="col-xl-12 col-md-12 col-12 d-flex justify-content-end">
              <Button
                onClick={handleOpenDialog}
                type="submit"
                style={{ marginTop: "25px", width: "150px" }}
                variant="outlined"
              >
                Add Task
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirm Task Addition"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to go to the Landing Page ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => handleaddTasks("prev")}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleaddTasks("next")}
                    color="primary"
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Data Added to the table successfully!!
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddTask;
