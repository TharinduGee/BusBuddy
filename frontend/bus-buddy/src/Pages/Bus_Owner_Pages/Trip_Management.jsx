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

function Trip_Management() {
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
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || " "} ${params.row.lastName || ""}`,
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
  const [selectedemail, setselectedemail] = useState("");
  const [selectedmobile, setselectedmobile] = useState("");
  const [selectedfullname, setselectedfullname] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [selectedRole, setselectedRole] = useState("");
  const handleRowClick = (params) => {
    setselectedID(params.row.id);
    setselectedemail(params.row.email);
    setselectedmobile(params.row.mobileNo);
    setselectedfullname(params.row.firstName + " " + params.row.lastName);
    setselectedRole(params.row.role);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
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
                  onRowClick={handleRowClick}
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
                      sx={{ width: 200 }}
                      // value={value}
                      // onChange={(newValue) => setValue(newValue)}
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
                      // value={value}
                      // onChange={(newValue) => setValue(newValue)}
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
                  id="Income"
                  class="form-control input-field-trip"
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Expense*</label>
                <input
                  type="text"
                  id="Expense"
                  class="form-control input-field-trip"
                />
              </div>
            </div>
            <div className="pair-container">
              <div className="input-and-label">
                <label class="form-label">Bus*</label>
                <Select
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Route*</label>
                <Select
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                />
              </div>
            </div>
            <div className="pair-container ">
              <div className="input-and-label">
                <label class="form-label">Driver*</label>
                <Select
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                />
              </div>

              <div className="input-and-label ">
                <label class="form-label">Conductor*</label>
                <Select
                  className="input-field-trip"
                  options={options}
                  isClearable={true}
                />
              </div>
            </div>
            <div className="schedule-tick">
              <Checkbox checked={checked} onChange={handleChange} />
              <label class="form-label">
                Schedule Trip for a Time Duration
              </label>
            </div>
            <div
              className={
                checked == true
                  ? "pair-container"
                  : "pair-container  hidden-schedule"
              }
            >
              <div className="d-flex flex-column input-and-label mt-1 mb-3">
                <label class="form-label">Starting Date*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ width: 200 }} />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>

              <div className="d-flex flex-column input-and-label mt-1 mb-4 ">
                <label class="form-label">Ending Date*</label>
                <ThemeProvider theme={text_box_the}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ width: 200 }} />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className="d-flex justify-content-center my-4">
              <Button className="add-trip-btn " variant="contained">
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
