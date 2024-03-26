import { useEffect, useState } from "react";
import "../../App.css";
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
import BasicBars from "../../shared/components/Chart/Chart";

function LandingPage() {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const dispatch = useDispatch();
  const [taskIdd, setTaskIdd] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
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
    setEditedRowIndex(null)
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
        return { ...item, studentName: e.target.value };
      }
      return item;
    });
    setFilteredData(upDatedTaskName);
  };

  const handleDiscChange = (e: any, itemId: any) => {
    const updatedDisc = filteredData.map((item) => {
      if (item.id === itemId) {
        const jnjb = (Number(item.obtainScore) > Number(e.target.value)) ? true: false;
        if(jnjb) {
          return { ...item, totalScore: item.totalScore };
        } else {
          const percentage = (item.obtainScore * 100) / Number(e.target.value);
          return { ...item, totalScore: e.target.value, average: percentage };
        }
      }
      return item;
    });
    setFilteredData(updatedDisc);
  };

  const handleCategoryChange = (e: any, itemId: any) => {
    const updatedCategory = filteredData.map((item) => {
      if (item.id === itemId) {
        const jnjbb = (Number(e.target.value) > Number(item.totalScore)) ? true: false;
        if(jnjbb) {
          return { ...item, obtainScore: item.obtainScore };
        } else {
          const percentage = (e.target.value * 100) / Number(item.totalScore);
          return { ...item, obtainScore: e.target.value, average: percentage };
        }
      }
      return item;
    });
    setFilteredData(updatedCategory);
  };

  useEffect(() => {
    const allTasksString = localStorage.getItem("allTask");
    if (allTasksString) {
      const allTasks = JSON.parse(allTasksString);
      if (Array.isArray(allTasks) && allTasks.length > 0) {
        let filtered = allTasks.filter(
          (item) =>
            item?.studentName?.toLowerCase().includes(filterText.toLowerCase())
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
    } else {
      setFilteredData([])
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

  return (
    <div>
      <BasicBars data={filteredData} />
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
                <span>Student Name</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("studentName")}
                >
                  <Sort />
                </span>
              </span>
            </th>
            <th>Total Score</th>
            <th>
              <span className="filterIcon">
                <span>Obtain Score</span>
                <span
                  style={{ cursor: "pointer" }}
                >
                </span>
              </span>
            </th>
            <th>Average</th>
            <th>Customize</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: any, index:number) => (
            <tr key={item.id} className={item.complete ? "Complete" : ""}>
              <td>
                <input
                  type="text"
                  value={item.studentName}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleTasknameChange(e, item.id)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.totalScore}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleDiscChange(e, item.id)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.obtainScore}
                  readOnly={editedRowIndex !== index}
                  onChange={(e) => handleCategoryChange(e, item.id)}
                />
              </td>
              <td>
                {item.average}
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
      </div>
    </div>
  );
}

export default LandingPage;
