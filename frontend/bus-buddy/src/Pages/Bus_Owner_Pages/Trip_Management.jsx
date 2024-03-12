import React, { useState } from "react";
import "./Trip_Management.css";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { IoIosArrowBack } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import { format } from "date-fns";
import dayjs from "dayjs";

function Trip_Management() {
  const buttonStyle = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: "#ff760d",
    color: "white",
  };

  const token = localStorage.getItem("token");
  const [rows_, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const table_theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
          },
          row: {
            "&:hover": {
              backgroundColor: "#FFDFC7",
            },
            "&.Mui-selected": {
              backgroundColor: "#FFDFC7",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFDFC7",
            },

            "& .MuiDataGrid-row": {
              "&:first-child .MuiDataGrid-cell": {
                borderRadius: "10px 10px 0 0",
              },
              "&:last-child .MuiDataGrid-cell": {
                borderRadius: "0 0 10px 10px",
              },
            },
          },
          cell: {
            border: "none",
            height: 2,

            "&.MuiDataGrid-cell--selected": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
  });

  const text_box_the = createTheme({
    shape: {
      borderRadius: 12,
    },
  });

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          notchedOutline: {
            borderWidth: "0",
          },
        },
      },
    },
  });

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJiX2lkIjoiNiIsImF1ZCI6IjYiLCJzdWIiOiJuZWRmc3lyeWZhIiwiaWF0IjoxNzA4MTEyNjQ0LCJleHAiOjE3MDgxMTYyNDR9.0tH3rYp92j3aLtouaOxueSj7Uc957wUQqSwEdl570GY";
    axios
      .get(
        `http://localhost:8081/api/v1/nullBusinessAndEmail?email=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const fetchedData = response.data;
        const formattedData = fetchedData.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNo: user.mobileNo,
          role: user.role,
        }));
        setRows(formattedData);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "startTime", headerName: "Start Time", width: 130 },
    {
      field: "endTime",
      headerName: "End Time",
      width: 90,
    },
    {
      field: "income",
      headerName: "Income",
      width: 90,
    },
    {
      field: "expense",
      headerName: "Expenses",
      width: 90,
    },
    {
      field: "busId",
      headerName: "Bus ID",
      width: 90,
    },
    {
      field: "routeId",
      headerName: "Route ID",
      width: 90,
    },
    {
      field: "driverId",
      headerName: "Driver ID",
      width: 90,
    },
    {
      field: "condocterId",
      headerName: "Conductor ID",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <div>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleEdit(params.row.id)}
          >
            <EditNoteSharpIcon />
          </IconButton>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [tripData, setTripData] = useState({
    startTime: null,
    endTime: null,
    busId: null,
    routeId: null,
    driverId: null,
    condocterId: null,
    income: null,
    expense: null,
    date: null,
  });

  const [durationDates, setDurationDates] = useState({
    firstDate: null,
    lastDate: null,
  });

  const handleChange = (e) => {
    const value_ = e.target.value;
    setTripData({
      ...tripData,
      [e.target.id]: value_,
    });

    console.log(tripData);
  };

  const clear = () => {
    setTripData({
      startTime: null,
      endTime: null,
      busId: null,
      routeId: null,
      driverId: null,
      condocterId: null,
      income: "",
      expense: "",
      date: null,
    });
  };

  const AddTripForTheDate = () => {
    // if (
    //   tripData.startTime === null ||
    //   tripData.endTime === "" ||
    //   tripData.busId === "" ||
    //   tripData.driverId === "" ||
    //   tripData.condocterId === null ||
    //   tripData.income === "" ||
    //   tripData.expense === "" ||
    //   tripData.date === ""
    // ) {
    //   alert("Please fill all the fields");
    // } else {
    const year = tripData.date.year();
    const month = tripData.date.month() + 1;
    const day = tripData.date.date();
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const jsStartTime = tripData.startTime.toDate();
    const formattedStartTime = format(jsStartTime, "HH:mm:ss");

    const jsEndTime = tripData.endTime.toDate();
    const formattedEndTime = format(jsEndTime, "HH:mm:ss");
    const passingData = {
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      income: tripData.income,
      busId: tripData.busId,
      routeId: tripData.routeId,
      driverId: tripData.driverId,
      condocterId: tripData.condocterId,
      expense: tripData.expense,
    };
    axios
      .post(
        `http://localhost:8081/api/v1/trip/add?date=${formattedDate}`,
        passingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("Data successfully posted:", response.data);
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
      });
    clear();
    // setRefresh(!refresh);
    // }
  };

  const options = [
    { value: "Chocolate", label: "Chocolate" },
    { value: "Strawberry", label: "Strawberry" },
    { value: "Vanilla", label: "Vanilla" },
  ];

  const [checked, setChecked] = useState(false);

  const handleChangecheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Sidebar>
      <div>
        <div className="d-flex flex-column align-items-center  justify-content-end">
          <div
            style={{ width: "80%" }}
            class="d-flex flex-wrap-reverse align-items-center  justify-content-between"
          >
            <ThemeProvider theme={theme}>
              <TextField
                id="outlined-basic"
                label="Search by Email"
                variant="outlined"
                onChange={handleSearchInputChange}
                InputProps={{
                  sx: {
                    backgroundColor: "#F4F4F4",
                    width: 350,
                    borderRadius: 10,
                    borderColor: "FF760D",
                  },
                }}
              />
            </ThemeProvider>
          </div>
          <div
            className="justify-content-center align-items-center d-flex py-4"
            style={{ height: 400, width: "100%" }}
          >
            <div
              className="justify-content-center align-items-center"
              style={{ width: "80%", height: 325 }}
            >
              <ThemeProvider theme={table_theme}>
                <DataGrid
                  rows={rows_}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  rowHeight={40}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <div
          className="justify-content-center align-items-center d-flex py-4"
          style={{ width: "100%" }}
        >
          <div className="trip-main-container">
            <div className="pair-container">
              <div className="d-flex flex-column input-and-label">
                <label class="form-label">Start Time*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={tripData.startTime}
                      sx={{ width: 200 }}
                      onChange={async (newValue) =>
                        await setTripData(
                          {
                            ...tripData,
                            startTime: newValue,
                          },
                          console.log(tripData)
                        )
                      }
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>

              <div className="d-flex flex-column input-and-label">
                <label class="form-label">End Time*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{ width: 200 }}
                      value={tripData.endTime}
                      onChange={async (newValue) =>
                        await setTripData(
                          {
                            ...tripData,
                            endTime: newValue,
                          },
                          console.log(tripData)
                        )
                      }
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className="pair-container">
              <div className="input-and-label">
                <label class="form-label">Income*</label>
                <input
                  type="text"
                  id="income"
                  class="form-control input-field-trip"
                  value={tripData.income}
                  onChange={handleChange}
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Expense*</label>
                <input
                  type="text"
                  id="expense"
                  class="form-control input-field-trip"
                  value={tripData.expense}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pair-container">
              <div className="input-and-label">
                <label class="form-label">Bus*</label>
                <Select
                  id="busId"
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                  onChange={async (newValue) => {
                    if (newValue !== null) {
                      await setTripData({
                        ...tripData,
                        busId: newValue.value,
                      });
                      console.log(tripData);
                    } else {
                      await setTripData({
                        ...tripData,
                        busId: newValue,
                      });
                      console.log(tripData);
                    }
                  }}
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Route*</label>
                <Select
                  id="routeId"
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                  onChange={async (newValue) => {
                    if (newValue !== null) {
                      await setTripData({
                        ...tripData,
                        routeId: newValue.value,
                      });
                      console.log(tripData);
                    } else {
                      await setTripData({
                        ...tripData,
                        routeId: newValue,
                      });
                      console.log(tripData);
                    }
                  }}
                />
              </div>
            </div>
            <div className="pair-container ">
              <div className="input-and-label">
                <label class="form-label">Driver*</label>
                <Select
                  id="driverId"
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                  onChange={async (newValue) => {
                    if (newValue !== null) {
                      await setTripData({
                        ...tripData,
                        driverId: newValue.value,
                      });
                      console.log(tripData);
                    } else {
                      await setTripData({
                        ...tripData,
                        driverId: newValue,
                      });
                      console.log(tripData);
                    }
                  }}
                />
              </div>

              <div className="input-and-label ">
                <label class="form-label">Conductor*</label>
                <Select
                  id="condocterId"
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                  onChange={async (newValue) => {
                    if (newValue !== null) {
                      await setTripData({
                        ...tripData,
                        condocterId: newValue.value,
                      });
                      console.log(tripData);
                    } else {
                      await setTripData({
                        ...tripData,
                        condocterId: newValue,
                      });
                      console.log(tripData);
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className={
                  checked == true
                    ? "hidden-schedule"
                    : "d-flex flex-column align-items-start input-and-label mt-4 "
                }
              >
                <label class="form-label">Date*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 200 }}
                      slotProps={{ field: { clearable: true } }}
                      value={tripData.date}
                      onChange={async (newValue) =>
                        await setTripData(
                          {
                            ...tripData,
                            date: newValue,
                          },
                          console.log(tripData)
                        )
                      }
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>

            <div
              className={
                checked == true
                  ? "pair-container mt-4"
                  : "pair-container  hidden-schedule"
              }
            >
              <div className="d-flex flex-column input-and-label mt-1 ">
                <label class="form-label">Starting Date*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 200 }}
                      slotProps={{ field: { clearable: true } }}
                      value={durationDates.firstDate}
                      onChange={async (newValue) =>
                        await setDurationDates(
                          {
                            ...durationDates,
                            firstDate: newValue,
                          },
                          console.log(durationDates)
                        )
                      }
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>

              <div className="d-flex flex-column input-and-label mt-1  ">
                <label class="form-label">Ending Date*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 200 }}
                      slotProps={{ field: { clearable: true } }}
                      value={durationDates.lastDate}
                      onChange={async (newValue) =>
                        await setDurationDates(
                          {
                            ...durationDates,
                            lastDate: newValue,
                          },
                          console.log(durationDates)
                        )
                      }
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className="schedule-tick">
              <Checkbox checked={checked} onChange={handleChangecheck} />
              <label class="form-label">
                Schedule Trip for a Time Duration
              </label>
            </div>
            <div className="d-flex justify-content-center ">
              <Button
                style={buttonStyle}
                className="d-flex  update-btn"
                variant="contained"
                onClick={AddTripForTheDate}
              >
                ADD TRIP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Trip_Management;
