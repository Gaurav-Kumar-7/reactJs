import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useTask } from "../shared/contexts";
import { useState } from "react";

function AddTask() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [complete, setComplete] = useState(Boolean);
  const { addTask } = useTask();
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);

  function add(e: any) {
    e.preventDefault();
    if (!title && !desc) {
        setError(true);
        setError1(true);
        return;
    } else if(title && !desc) {
        setError1(true);
        return;
    }else if(!title && desc) {
        setError(true);
        return;
    }
    addTask({ title,desc,complete });
    console.log({ title,desc,complete });
    setTitle("");
    setDesc("");
    setComplete(false);
  }

  const handleChangeTitle = ((e:any) => {
    setTitle(e.target.value);
    setError(false);
  })

  const handleChangeDesc = ((e:any) => {
    setDesc(e.target.value);
    setError1(false);
  })

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-4 col-md-4 col-12">
            <TextField
              className="w-100"
              id="outlined-basic"
              value={title}
              onChange={handleChangeTitle}
              label="Title"
              variant="outlined" 
              error={error}
              helperText={error ? "Value is required" : ""} 
              required
            />
          </div>
          <div className="col-xl-4 col-md-4 col-12">
            <TextField
              className="w-100"
              id="outlined-basic"
              value={desc}
              onChange={handleChangeDesc}
              label="Description"
              variant="outlined" 
              error={error1}
              helperText={error1 ? "Value is required" : ""} 
              required
            />
          </div>
          <div className="col-xl-2 col-md-2 col-12">
            <FormGroup style={{ marginTop: "25px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={complete}
                    onChange={() => setComplete(!complete)}
                  />
                }
                label="Completed"
              />
            </FormGroup>
          </div>
          <div className="col-xl-2 col-md-2 col-12">
            <Button
              onClick={add}
              type="submit"
              style={{ marginTop: "25px", width: "150px" }}
              variant="outlined"
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
