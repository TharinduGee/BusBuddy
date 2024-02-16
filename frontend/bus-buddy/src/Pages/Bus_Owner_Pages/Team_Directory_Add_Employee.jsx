import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import Button_ from "@mui/material/Button";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import { IoIosArrowBack } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Popup from "./Update_popup";
import { DialogTitle } from "@mui/material";

function Team_Directory_Add_Employee() {
  const [openPopup, setOpenPopup] = useState(false);
  const [rows_, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

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

    { field: "email", headerName: "Email", width: 300 },
    { field: "mobileNo", headerName: "Mobile No", width: 130 },
    { field: "role", headerName: "Role", width: 160 },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || " "} ${params.row.lastName || ""}`,
    // },
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

  return (
    <div>
      <Sidebar>
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
            <div className="d-flex  py-3">
              <Button
                href="/teamdirectory"
                className="mx-2"
                size="large"
                variant="text"
                startIcon={<IoIosArrowBack color="black" />}
                style={{ borderRadius: 10, color: "black" }}
              >
                Back
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
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div>
              <img className="photo-view" src={avatar} alt="profile Icon" />
            </div>

            <div className="d-flex flex-column">
              <lable className="profession">{selectedRole.split("_")[1]}</lable>
              <lable class="name-avatar">{selectedfullname}</lable>
              <div className="normal-details">
                <lable>ID :</lable>
                <lable> {selectedID}</lable>
              </div>
              <lable className="normal-details">{selectedemail}</lable>
              <lable className="normal-details"> {selectedmobile}</lable>

              <Button_
                className="mx-4 my-2"
                onClick={() => setOpenPopup(true)}
                style={{
                  color: "#FF760D",
                  width: "200px",
                  borderColor: "#FF760D",
                }}
                variant="outlined"
                startIcon={<AddCircleSharpIcon />}
              >
                ADD
              </Button_>
            </div>
          </div>
        </div>
        <Popup
          title="Add Employee"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div>
              <img className="photo-view" src={avatar} alt="Add Icon" />
            </div>

            <div className="d-flex flex-column align-items-center">
              <lable className="profession">{selectedRole.split("_")[1]}</lable>
              <lable class="name-avatar">{selectedfullname}</lable>
              <div className="normal-details">
                <lable>ID :</lable>
                <lable> {selectedID}</lable>
              </div>

              <TextField
                id="outlined-basic"
                label="Enter the salary"
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
                  ADD
                </Button_>
              </div>
            </div>
          </div>
        </Popup>
      </Sidebar>
    </div>
  );
}

export default Team_Directory_Add_Employee;
