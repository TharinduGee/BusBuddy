import React, { Children, useEffect, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import add_icon from "./../../Assets/Owner_assests/add_icon.png";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import "./Route_Management.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button_ from "@mui/material/Button";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Route_Management() {
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

  const [isUpdateButtonDisabled, setisUpdateButtonDisabled] = useState(true);

  const [isAddButtonDisabled, setisAddButtonDisabled] = useState(false);

  const buttonStyle_Update = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: isUpdateButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

  const buttonStyle_Add = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: isAddButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

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

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const [rows_, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <Sidebar>
      <div className="d-flex flex-column align-items-start  justify-content-end">
        <div className="d-flex align-items-start">
          <ThemeProvider theme={theme}>
            <TextField
              onChange={handleSearchInputChange}
              id="outlined-basic"
              label="Search"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                  border: "none",
                  width: 400,

                  "@media (max-width: 400px)": {
                    width: 250,
                  },
                },
              }}
            />
          </ThemeProvider>
        </div>
        <div
          className="justify-content-center align-items-center d-flex pt-2  "
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

        <div
          className="justify-content-center align-items-center d-flex py-4"
          style={{ width: "100%" }}
        >
          <div className="op-main-container">
            <div className="d-flex flex-wrap  justify-content-between two-fields">
              <div className="input-and-label">
                <label class="form-label">Start Destination*</label>
                <input
                  type="text"
                  id="Start_Destination"
                  class="form-control input-field"
                />
              </div>
              <div className="input-and-label">
                <label class="form-label">End Destination*</label>
                <input
                  type="text"
                  id="End_Destination"
                  class="form-control input-field"
                />
              </div>
            </div>
            <div className="d-flex flex-wrap  justify-content-between two-fields">
              <div className="input-and-label">
                <label class="form-label">Distance*</label>
                <input
                  type="text"
                  id="Distance"
                  class="form-control input-field"
                />
              </div>
              <div className="input-and-label">
                <label class="form-label">Number of Sections*</label>
                <input
                  type="text"
                  id="Number_of_Sections"
                  class="form-control input-field"
                />
              </div>
            </div>
            <div className="choosefile-expiredate">
              <div className="input-and-label">
                <label class="form-label">Permite Expire Date*</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "10px",
                          width: "300px",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div
                style={{
                  width: 340,
                  margin: 30,
                  marginBottom: 1,
                }}
                class="input-group "
              >
                <input
                  type="file"
                  class="form-control input-field-choosefile "
                  id="inputGroupFile02"
                />
                <Button_
                  style={{ height: 35 }}
                  class="input-group-text"
                  for="inputGroupFile02"
                >
                  Upload
                </Button_>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-between two-fields">
              <Button
                style={buttonStyle_Add}
                className="d-flex  update-btn"
                variant="contained"
                disabled={isAddButtonDisabled}
              >
                Add Route
              </Button>
              <Button
                style={buttonStyle_Update}
                className="d-flex  update-btn"
                variant="contained"
                disabled={isUpdateButtonDisabled}
              >
                Update Route
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Route_Management;
