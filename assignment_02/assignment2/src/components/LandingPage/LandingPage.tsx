import { useEffect, useState } from "react";
import "../../App.css";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTask,
  updateDisc,
  updateCategory,
  updatePriority,
  updateStstus,
} from "../../shared/features/tasks/tasksSlice";

function LandingPage() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const dispatch = useDispatch();
  const [taskIdd, setTaskIdd] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [open, setOpen] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState<number | null>(null);

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const editTask = () => {
    console.log("Edit");
    console.log(isTaskEditable)
    dispatch(updateTask(filteredData));
    dispatch(updateDisc(filteredData));
    dispatch(updateCategory(filteredData));
    dispatch(updatePriority(filteredData));
    dispatch(updateStstus(filteredData));
    setIsTaskEditable(false);
    setOpen(true);
    setEditedRowIndex(null)
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleChangeCheckBox = (e: any, itemId: any) => {
    e.preventDefault();
    const updatedStatus = filteredData.map((item) => {
      if (item.id === itemId) {
        return { ...item, complete: e.target.checked };
      }
      return item;
    });
    setFilteredData(updatedStatus);
  };

  const taskId = (evt: string) => {
    setTaskIdd(evt);
    dispatch(removeTask(evt));
    const updatedTasks = filteredData.filter((item) => item.id !== evt);
    setFilteredData(updatedTasks);
    console.log(taskIdd);
  };

  const handleTasknameChange = (e: any, itemId: any) => {
    const upDatedTaskName = filteredData.map((item) => {
      if (item.id === itemId) {
        return { ...item, taskName: e.target.value };
      }
      return item;
    });
    setFilteredData(upDatedTaskName);
  };

  const handleDiscChange = (e: any, itemId: any) => {
    const updatedDisc = filteredData.map((item) => {
      if (item.id === itemId) {
        return { ...item, disc: e.target.value };
      }
      return item;
    });
    setFilteredData(updatedDisc);
  };

  const handleCategoryChange = (e: any, itemId: any) => {
    const updatedCategory = filteredData.map((item) => {
      if (item.id === itemId) {
        return { ...item, category: e.target.value };
      }
      return item;
    });
    setFilteredData(updatedCategory);
  };

  const handlePriorityChange = (e: any, itemId: any) => {
    const updatedPriority = filteredData.map((item) => {
      if (item.id === itemId) {
        return { ...item, priority: e.target.value };
      }
      return item;
    });
    setFilteredData(updatedPriority);
  };

  useEffect(() => {
    const allTasksString = localStorage.getItem("allTask");
    if (allTasksString) {
      const allTasks = JSON.parse(allTasksString);
      if (Array.isArray(allTasks) && allTasks.length > 0) {
        let filtered = allTasks.filter(
          (item) =>
            item.taskName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.disc.toLowerCase().includes(filterText.toLowerCase()) ||
            item.priority.toLowerCase().includes(filterText.toLowerCase()) ||
            item.category.toLowerCase().includes(filterText.toLowerCase())
        );
        if (sortConfig !== null) {
          const { key, direction } = sortConfig;
          filtered = filtered.sort((a, b) => {
            const valueA = a[key].toLowerCase();
            const valueB = b[key].toLowerCase();
            if (valueA  < valueB) return direction === "asc" ? -1 : 1;
            if (valueA > valueB) return direction === "asc" ? 1 : -1;
            return 0;
          });
        }
        setFilteredData(filtered);
      }
    }
  }, [filterText, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
    <div>
      <input
        className="mb-3"
        type="text"
        placeholder="Filter tasks..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <table>
        <thead>
          <tr>
            <th>
              <span className="filterIcon">
                <span>Task Name</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("taskName")}
                >
                  <Sort />
                </span>
              </span>
            </th>
            <th>Discption</th>
            <th>
              <span className="filterIcon">
                <span>Category</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("category")}
                >
                  <Sort />
                </span>
              </span>
            </th>
            <th>Due Date</th>
            <th>
              <span className="filterIcon">
                <span>Priority</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("priority")}
                >
                  <Sort />
                </span>
              </span>
            </th>
            <th>Completed</th>
            <th>Customize</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: any, index:number) => (
            <tr key={item.id} className={item.complete ? "Complete" : ""}>
              <td>
                <input
                  type="text"
                  value={item.taskName}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleTasknameChange(e, item.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.disc}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleDiscChange(e, item.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.category}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleCategoryChange(e, item.id)}
                />
              </td>
              <td>
                {formatDate(item.value)}
              </td>
              <td>
                <input
                  type="text"
                  value={item.priority}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handlePriorityChange(e, item.id)}
                />
              </td>
              <td>
                <Checkbox
                  {...label}
                  defaultChecked={item.complete}
                  onChange={(e) => handleChangeCheckBox(e, item.id)}
                  disabled={editedRowIndex !== index}
                />
              </td>
              <td>
                <div style={{display:"flex", gap: "30px"}}>
                {editedRowIndex === index ? (
                  <a 
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={editTask}
                  >
                    📁
                  </a>
                ) : (
                  <a
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      setIsTaskEditable(true);
                      setEditedRowIndex(index);
                    }}
                  >
                    ✏️
                  </a>
                )}
                <a
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => taskId(item.id)}
                >
                  ❌
                </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Task modified successfully!!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LandingPage;
