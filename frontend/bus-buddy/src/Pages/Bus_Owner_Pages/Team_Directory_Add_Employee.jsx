import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import Button_ from "@mui/material/Button";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import { IoIosArrowBack } from "react-icons/io";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Popup from "./Update_popup";
import Swal from "sweetalert2";

function Team_Directory_Add_Employee() {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [salary, setSalary] = useState(null);

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
  const token = localStorage.getItem("token");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
    console.log(salary);
  };

  const columns = [
    { field: "id", headerName: "ID", minwidth: 70, flex: 1 },
    { field: "firstName", headerName: "First name", minwidth: 130, flex: 1 },
    { field: "lastName", headerName: "Last name", minwidth: 130, flex: 1 },

    { field: "email", headerName: "Email", minwidth: 300, flex: 1 },
    { field: "mobileNo", headerName: "Mobile No", minwidth: 130, flex: 1 },
    { field: "role", headerName: "Role", minwidth: 160, flex: 1 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minwidth: 160,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || " "} ${params.row.lastName || ""}`,
    },
  ];
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

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
  const inputRef = useRef(null);
  const [refresh, setRefresh] = useState(true);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const clear = () => {
    setSalary(null);
    if (inputRef.current.value) {
      inputRef.current.value = null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      axios
        .get(
          `http://localhost:8081/api/v1/user/findUnEnrolledUsers?pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}&email=${searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const fetchedData = response.data.content;
          const formattedData = fetchedData.map((user, index) => ({
            id: index + 1,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNo: user.mobileNo,
            role: user.role.split("_")[1],
          }));

          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: formattedData,
            total: response.data.totalElements,
          }));
          console.log(fetchedData);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setPageState((old) => ({
            ...old,
            isLoading: false,
          }));
        });
    };

    fetchData();
  }, [
    searchInput,
    paginationModel.page,
    paginationModel.pageSize,
    salary,
    file,
    refresh,
  ]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const AddEmployee = () => {
    const now = new Date();
    const formattedDate = formatDate(now);

    const form = new FormData();
    form.append("file", file);

    axios
      .post(
        `http://localhost:8081/api/v1/employee/add?salary=${salary}&joinedDate=${formattedDate}&email=${selectedemail}`,
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
        Swal.fire({
          title: "Good job!",
          text: "Employee Added Successfully!",
          icon: "success",
        });
        setRefresh(!refresh);
        setOpenPopup(!openPopup);
        console.log("Data successfully posted:", response.data);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error("Error posting data:", error);
      });
    clear();
  };
  const handlepopADD = () => {
    console.log(salary);
    if (salary !== null) {
      console.log("in");
      AddEmployee();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter the Salary First",
      });
    }
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
            <lable className="profession">{selectedRole}</lable>
            <lable class="name-avatar">{selectedfullname}</lable>
            <div className="normal-details">
              <lable>ID :</lable>
              <lable> {selectedID}</lable>
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
                onClick={handlepopADD}
                style={{ width: 200 }}
                variant="outlined"
              >
                ADD
              </Button_>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Team_Directory_Add_Employee;
