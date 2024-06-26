import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import add_icon from "./../../Assets/Owner_assests/add_icon.png";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import RingLoader from "react-spinners/RingLoader";
import { DataGrid } from "@mui/x-data-grid";
import { IoIosFolderOpen } from "react-icons/io";
import "./Team_Directory.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Popup from "./Update_popup";
import ButtonAdd from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Team_Directory() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
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
  const [selectedFileName, setselectedFileName] = useState("");
  const [joinedDate, setjoinedDate] = useState("");
  const handleRowClick = (params) => {
    setselectedID(params.row.id);
    setjoinedDate(params.row.joinedDate);
    setSalary(params.row.salary);
    setselectedfullname(params.row.Name);
    setselectedRole(params.row.designation);
    setselectedSalary(params.row.salary);
    setselectedFileName(params.row.docName);
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
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/employee/edit?empId=${selectedID}&salary=${salary}&joinedDate=${joinedDate}`,

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
        setLoading(false);
        setRefresh(!refresh);
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
        setLoading(false);
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "Name", headerName: "Full Name", width: 180 },
    { field: "salary", headerName: "Salary", width: 130 },
    {
      field: "age",
      headerName: "Age",

      width: 90,
    },
    { field: "joinedDate", headerName: "Joined Date", width: 180 },
    { field: "designation", headerName: "Designation", width: 130 },
    { field: "docId", headerName: "Document ID", width: 130 },
    { field: "docName", headerName: "Document Name", width: 280 },

    {
      field: "actions",
      headerName: "Actions",
      width: 240,

      renderCell: (params) => (
        <div>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
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
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            onClick={() => handleOpen(params.row)}
          >
            <IoIosFolderOpen />
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
          `${process.env.REACT_APP_API_URL}api/v1/employee/findEmployees?name=${searchInput}&pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const fetchedData = response.data.content;
          console.log(fetchedData);
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
            docId: user.docId,
            docName: user.docName,
          }));

          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: formattedData,
            total: response.data.totalElements,
          }));
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setPageState((old) => ({
            ...old,
            isLoading: false,
          }));
        });
    };
    console.log(joinedDate);
    console.log(file);
    fetchData();
  }, [
    searchInput,
    paginationModel.page,
    paginationModel.pageSize,
    salary,
    file,
    refresh,
    token,
    joinedDate,
  ]);
  const navigate = useNavigate();
  const handleOpen = async (row) => {
    console.log(row);
    if (row.docId != null) {
      navigate("/filelibrary/SERVICE AGREEMENT", {
        state: { id: row.docId, docName: row.docName },
      });
    } else {
      Swal.fire("Error", "No Document to Open", "error");
    }
  };

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
        setLoading(true);
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}api/v1/employee/remove?empId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Data successfully deleted:", response.data);
            Swal.fire({
              title: "Deleted!",
              text: "User removed from your business.",
              icon: "success",
            });
            setLoading(false);
            setRefresh(!refresh);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            setLoading(false);
            console.error("Error deleting data:", error.message);
          });
      }
    });
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <h1>Team Directory</h1>
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
                  width: 250,
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
            style={{ width: "90%", height: 325 }}
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
        {loading ? (
          <div className="ringloader-position">
            <RingLoader
              loading={loading}
              color="orange"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
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
        )}
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
              value={salary}
              onChange={handleSalaryChange}
              type="number"
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  width: 250,
                  borderRadius: 2,
                },
              }}
            />
            <input
              type="file"
              class="form-control input-field-choosefile mt-4"
              id="inputGroupFile02"
              style={{ width: 250 }}
              onChange={handleFileChange}
              ref={inputRef}
            />
            <div className="normal-details-filename">
              <lable> {selectedFileName}</lable>
            </div>

            <div className="d-flex my-4 justify-content-center">
              <ButtonAdd
                onClick={handlepopUpdate}
                style={{ width: 200 }}
                variant="outlined"
              >
                Update
              </ButtonAdd>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Team_Directory;
