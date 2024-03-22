import React, { useEffect, useState, useRef } from "react";
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
import Swal from "sweetalert2";
import axios from "axios";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

function Team_Directory() {
  const token = localStorage.getItem("token");
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);
  const [salary, setSalary] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);
  const clear = () => {
    setSalary(null);
    if (inputRef.current.value) {
      inputRef.current.value = null;
    }
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
    console.log(salary);
  };

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [refresh, setRefresh] = useState(true);
  const [selectedfullname, setselectedfullname] = useState("");
  const [selectedID, setselectedID] = useState("");
  const [selectedRole, setselectedRole] = useState("");
  const [selectedSalary, setselectedSalary] = useState("");
  const handleRowClick = (params) => {
    setselectedID(params.row.id);

    setselectedfullname(params.row.Name);
    setselectedRole(params.row.designation);
    setselectedSalary(params.row.salary);
  };

  const handlepopUpdate = () => {
    console.log(salary);
    if (salary !== null) {
      console.log("in");
      UpdateEmployee();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter the Salary First",
      });
    }
  };

  const UpdateEmployee = () => {
    const form = new FormData();
    form.append("file", file);

    axios
      .post(
        `http://localhost:8081/api/v1/employee/edit?empId=${selectedID}&salary=${salary}`,

        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data; boundary=---011000010111000001101001",
          },
          data: "[form]",
        }
      )
      .then(function (response) {
        setOpenPopup(!openPopup);
        console.log("Data successfully posted:", response.data);
        Swal.fire({
          title: "Good job!",
          text: "Employee Detailed Updated Successfully!",
          icon: "success",
        });
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    clear();
    setRefresh(!refresh);
  };

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
    { field: "id", headerName: "ID", minwidth: 70, flex: 1 },
    { field: "Name", headerName: "Full Name", minwidth: 130, flex: 1 },
    { field: "salary", headerName: "Salary", minwidth: 130, flex: 1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      minwidth: 90,
      flex: 1,
    },
    { field: "joinedDate", headerName: "Joined Date", minwidth: 130, flex: 1 },
    { field: "designation", headerName: "Designation", minwidth: 130, flex: 1 },
    // { field: "docId", headerName: "Doc ID", width: 130 },
    {
      field: "docName",
      headerName: "Doc Name",
      type: "number",
      minwidth: 90,
      flex: 1,
    },
    // {
    //   field: "bday",
    //   headerName: "Birthday",
    //   type: "number",
    //   width: 90,
    // },
    {
      field: "actions",
      headerName: "Actions",
      minwidth: 140,
      flex: 1,
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
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      axios
        .get(
          `http://localhost:8081/api/v1/employee/findEmployees?name=${searchInput}&pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const fetchedData = response.data.content;
          const formattedData = fetchedData.map((user) => ({
            id: user.empId,
            Name: user.name,
            salary: user.salary,
            age: user.age,
            joinedDate: user.joinedDate.split("T")[0],
            designation: user.designation.split("_")[2],
            docId: user.docId,
            docName: user.docName,
            bday: user.bday,
          }));

          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: formattedData,
            total: response.data.totalElements,
          }));
          console.log("formateed", formattedData);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setPageState((old) => ({
            ...old,
            isLoading: false,
          }));
        });
    };
    console.log(file);
    fetchData();
  }, [
    searchInput,
    paginationModel.page,
    paginationModel.pageSize,
    salary,
    file,
    refresh,
  ]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/api/v1/employee/remove?empId=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Data successfully deleted:", response.data);
            Swal.fire({
              title: "Deleted!",
              text: "User removed from your business.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error.message);
          });
        setRefresh(!refresh);
      }
    });
  };

  return (
    <div>
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
              onChange={handleSearchInputChange}
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
                rows={pageState.data}
                page={pageState.page - 1}
                columns={columns}
                loading={pageState.isLoading}
                rowCount={pageState.total}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10]}
                rowHeight={40}
                onRowClick={handleRowClick}
              />
            </ThemeProvider>
          </div>
        </div>
        <div
          className={
            selectedID !== ""
              ? "d-flex flex-wrap justify-content-center align-items-center"
              : "hidden-schedule"
          }
        >
          <div>
            <img className="photo-view" src={avatar} alt="profile Icon" />
          </div>

          <div className="d-flex flex-column">
            <lable className="profession">{selectedRole}</lable>
            <lable class="name-avatar">{selectedfullname}</lable>
            <div className="normal-details">
              <lable>ID :</lable>
              <lable> {selectedID}</lable>
            </div>
            <div className="normal-details">
              <lable>Salary :</lable>
              <lable> {selectedSalary}</lable>
            </div>
          </div>
        </div>
      </div>
      <Popup
        title="Update Employee"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div>
            <img className="photo-view" src={avatar} alt="Add Icon" />
          </div>

          <div className="d-flex flex-column align-items-center">
            <lable className="profession">{selectedRole}</lable>
            <lable class="name-avatar">{selectedfullname}</lable>
            <div className="normal-details">
              <lable>ID :</lable>
              <lable> {selectedID}</lable>
            </div>
            <div className="normal-details">
              <lable>Salary :</lable>
              <lable> {selectedSalary}</lable>
            </div>

            <TextField
              id="outlined-basic"
              label="Enter the salary"
              variant="outlined"
              onChange={handleSalaryChange}
              onKeyPress={(event) => {
                const char = String.fromCharCode(event.charCode);
                if (!/^\d|\.$|^[-]/.test(char)) {
                  event.preventDefault();
                }
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  width: 350,
                  borderRadius: 2,
                },
              }}
            />
            <input
              type="file"
              class="form-control input-field-choosefile mt-4"
              id="inputGroupFile02"
              style={{ width: 350 }}
              onChange={handleFileChange}
              ref={inputRef}
            />

            <div className="d-flex my-4 justify-content-center">
              <Button_
                onClick={handlepopUpdate}
                style={{ width: 200 }}
                variant="outlined"
              >
                Update
              </Button_>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Team_Directory;
