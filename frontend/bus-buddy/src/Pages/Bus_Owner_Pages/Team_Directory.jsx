import React, { Children, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import add_icon from "./../../Assets/Owner_assests/add_icon.png";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Popup from "./Update_popup";
import Button_ from "@mui/material/Button";

function Team_Directory() {
  const [openPopup, setOpenPopup] = useState(false);
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
            onClick={() => setOpenPopup(true)}
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
  return (
    <Sidebar>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <div
          style={{ width: "80%" }}
          class="d-flex flex-wrap-reverse align-items-center  justify-content-between"
        >
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  width: 350,
                  borderRadius: 10,
                  border: "none",
                },
              }}
            />
          </ThemeProvider>
          <div className="d-flex  py-3">
            <Button
              href="teamdirectory/addemployee"
              className="mx-2"
              size="large"
              variant="text"
              style={{ borderRadius: 10, color: "black" }}
              startIcon={
                <img className="plus-icon " src={add_icon} alt="Add Icon" />
              }
            >
              Add Employee
            </Button>
          </div>
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
                rows={rows}
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
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div>
            <img className="photo-view" src={avatar} alt="Add Icon" />
          </div>

          <div className="d-flex flex-column">
            <lable className="profession">Driver</lable>
            <lable class="name-avatar">Kamal Fernando </lable>
            <div className="normal-details">
              <lable>ID :</lable>
              <lable> PV13289290</lable>
            </div>
            <lable className="normal-details"> Kamalfernando@gmail.com</lable>
            <lable className="normal-details"> +94726465466</lable>
            <div className="normal-details">
              <lable>Salary :</lable>
              <lable> 45000/=</lable>
            </div>
          </div>
        </div>
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div>
            <img className="photo-view" src={avatar} alt="Add Icon" />
          </div>

          <div className="d-flex flex-column">
            <lable className="profession">Driver</lable>
            <lable class="name-avatar">Kamal Fernando </lable>
            <div className="normal-details">
              <lable>ID :</lable>
              <lable> PV13289290</lable>
            </div>

            <div className="normal-details mb-3">
              <lable>Current Salary :</lable>
              <lable> 45000/=</lable>
            </div>
            <TextField
              id="outlined-basic"
              label="Enter the new salary"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  width: 350,
                  borderRadius: 2,
                },
              }}
            />
            <div className="d-flex my-4 justify-content-center">
              <Button_
                onClick={() => setOpenPopup(false)}
                style={{ width: 200 }}
                variant="outlined"
              >
                Update
              </Button_>
            </div>
          </div>
        </div>
      </Popup>
    </Sidebar>
  );
}

export default Team_Directory;
