import React from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import add_icon from "./../../Assets/Owner_assests/add_icon.png";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Team_Directory() {
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
            style={{ color: "blue" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleEdit(params.row.id)}
          >
            <EditNoteSharpIcon />
          </IconButton>
          <IconButton
            style={{ color: "red" }}
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
      <div>
        <div class="d-flex flex-wrap align-items-center  justify-content-between">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            InputProps={{
              sx: {
                backgroundColor: "#F4F4F4",
                width: 400,
                borderRadius: 10,
                borderColor: "#F4F4F4",
              },
            }}
          />
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
        <div className="d-flex py-4" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
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
    </Sidebar>
  );
}

export default Team_Directory;
