import React, { useState } from "react";
import "./Fleet_Operation.css";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Fleet_Operation() {
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
  const [isUpdateButtonDisabled, setisUpdateButtonDisabled] = useState(true);

  const [isAddButtonDisabled, setisAddButtonDisabled] = useState(false);

  const buttonStyle_Update = {
    borderRadius: 10,
    width: 200,
    margin: 20,
    backgroundColor: isUpdateButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

  const buttonStyle_Add = {
    width: 200,
    borderRadius: 10,
    margin: 20,
    backgroundColor: isAddButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

  const datepicker_theme = createTheme({
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

  const columns = [
    { field: "id", headerName: "Bus ID", width: 70 },
    { field: "bustype", headerName: "Bus Type", width: 130 },
    { field: "numberplate", headerName: "Number Plate", width: 130 },
    {
      field: "lastservicedate",
      headerName: "Last Service Date",

      width: 130,
    },
    {
      field: "regno",
      headerName: "Registration No",
      width: 130,
    },
    {
      field: "numberofseats",
      headerName: "Number Of Seats",
      width: 130,
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

  const handleSearchInputChange = (event) => {};

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
                label="Search by Bus ID"
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
                  // onRowClick={handleRowClick}
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
              <div className="input-and-label">
                <label class="form-label">Number Plate*</label>
                <input
                  type="text"
                  id="numberplate"
                  class="form-control input-field-trip"
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Registration No*</label>
                <input
                  type="text"
                  id="registration_no"
                  class="form-control input-field-trip"
                />
              </div>
            </div>
            <div className="pair-container">
              <div className="input-and-label">
                <label class="form-label">Number of Seats*</label>
                <input
                  type="text"
                  id="numberofseats"
                  class="form-control input-field-trip"
                />
              </div>

              <div className="input-and-label">
                <label class="form-label">Bus Type*</label>
                <select class="form-select input-field-trip">
                  <option value="NORMAL">Normal</option>
                  <option value="SEMI_LUXURY">Semi-Luxury</option>
                  <option value="LUXURY">Luxury</option>
                </select>
              </div>
            </div>
            <div className="pair-container">
              <div className="d-flex flex-column input-and-label">
                <label class="form-label">Service Date*</label>
                <ThemeProvider theme={datepicker_theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 300 }}
                      // value={value}
                      // onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className="d-flex flex-wrap mt-4 justify-content-between two-fields">
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

export default Fleet_Operation;
