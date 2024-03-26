import "../../App.css";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../shared/features/tasks/tasksSlice";

function AddTask() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [studentName, setSetStudentName] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [obtainScore, setObtainScore] = useState("");
  const [average, setAverage] = useState("");
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (event) {
      event.preventDefault();
    }
    setOpen(false);
  };

  const handleOpenDialog = () => {
    if (!studentName || !totalScore || !obtainScore || !average) {
      setError(true);
      setError1(true);
      setError2(true);
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

  const handleStudentName = (e: any) => {
    setError(false);
    setSetStudentName(e.target.value);
  };

  const handleTotalScore = (e: any) => {
    setError1(false);
    const totalScore = e.target.value;
    if (totalScore < 0) {
      return;
    }
    if (!!obtainScore) {
      const percentage = (Number(obtainScore) * 100) / totalScore;
      setAverage(Number(percentage).toFixed(0));
    }
    setTotalScore(totalScore);
  };

  const handleObtainScore = (e: any) => {
    setError2(false);
    const score = e.target.value;
    if (score < 0) {
      return;
    }
    if (score > Number(totalScore)) {
      setError2(true);
      return;
    }
    setObtainScore(score);
    const percentage = (score * 100) / Number(totalScore);
    setAverage(Number(percentage).toFixed(2));
  };

  const handleAverage = (e: any) => {
    setAverage(e.target.value);
  };

  function addTasks() {
    if (!studentName || !totalScore || !obtainScore || !average) {
      setError(true);
      setError1(true);
      setError2(true);
      return;
    }
    const taskData = {
      studentName: studentName,
      totalScore: totalScore,
      obtainScore: obtainScore,
      average: average,
    };
    dispatch(addTask(taskData));
    setOpen(true);
    console.log(taskData);
    setSetStudentName("");
    setTotalScore("");
    setObtainScore("");
    setAverage("");
  }

  return (
    <>
      <div className="card border-light mb-3">
        <div className="card-header">Add Student</div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-4 col-md-4 col-12 task">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                id="studentName"
                label="Student Name"
                name="studentName"
                value={studentName}
                onChange={handleStudentName}
                error={error}
                helperText={error ? "Value is required" : ""}
              />
            </div>
            <div className="col-xl-4 col-md-4 col-12 task">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                type="number"
                id="totalScore"
                label="Total Score"
                name="totalScore"
                value={totalScore}
                onChange={handleTotalScore}
                error={error1}
                helperText={error1 ? "Value is required" : ""}
              />
            </div>
            <div className="col-xl-4 col-md-4 col-12 task">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                type="number"
                id="obtainScore"
                label="Obtain Score"
                name="obtainScore"
                value={obtainScore}
                onChange={handleObtainScore}
                error={error2}
                helperText={error2 ? "Value is required" : ""}
              />
            </div>
            <div className="col-xl-4 col-md-4 col-12 task mt-3">
              <TextField
                style={{ paddingTop: "8px" }}
                className="w-100"
                id="average"
                type="number"
                label="Average (%)"
                name="average"
                value={average}
                onChange={handleAverage}
                disabled={true}
              />
            </div>
            <div className="col-xl-12 col-md-12 col-12 d-flex justify-content-end">
              <Button
                onClick={handleOpenDialog}
                type="submit"
                style={{ marginTop: "25px", width: "150px" }}
                variant="outlined"
              >
                Add Student
              </Button>
            </div>
          </div>
        </div>
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
            <Button onClick={() => handleaddTasks("prev")} color="primary">
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
    </>
  );
}
export default AddTask;
