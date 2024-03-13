import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import "./Route_Management.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";

function Route_Management() {
  const token = localStorage.getItem("token");

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

  const datepicker_theme = createTheme({
    shape: {
      borderRadius: 12,
    },
  });

  const columns = [
    { field: "id", headerName: "Route ID", width: 130 },
    { field: "startDestination", headerName: "Start Destination", width: 130 },
    { field: "endDestination", headerName: "End Destination", width: 130 },
    {
      field: "distance",
      headerName: "Distance",
      type: "number",
      width: 90,
    },
    {
      field: "noOfSections",
      headerName: "Sections",
      width: 90,
    },
    {
      field: "permitExpDate",
      headerName: "Permite Expire Date",
      width: 150,
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
            onClick={() => handleEdit(params.row)}
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

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [refresh, setRefresh] = useState(true);
  const [value, setValue] = useState(null);
  const [routeId, setrouteId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [routeData, setRouteDate] = useState({
    startDestination: "",
    endDestination: "",
    distance: null,
    noOfSections: null,
    permitExpDate: value,
  });

  const handleEdit = (e) => {
    const updatedId = e.id;
    setrouteId(updatedId);
    const updatedValue = dayjs(e.permitExpDate);
    setValue(updatedValue);
    setRouteDate({
      startDestination: e.startDestination,
      endDestination: e.endDestination,
      distance: e.distance,
      noOfSections: e.noOfSections,
      permitExpDate: updatedValue,
    });

    setisUpdateButtonDisabled(false);
    setisAddButtonDisabled(true);
    console.log(routeId);
  };

  const handleChange = (e) => {
    const value_ = e.target.value;
    setRouteDate({
      ...routeData,
      [e.target.id]: value_,
    });

    console.log(routeData);
  };

  const clear = () => {
    setFile(null);
    setValue(null);
    setRouteDate({
      startDestination: "",
      endDestination: "",
      distance: "",
      noOfSections: "",
      permitExpDate: "",
    });
    setisUpdateButtonDisabled(true);
    setisAddButtonDisabled(false);
  };

  const AddRoute = () => {
    if (
      routeData.distance === null ||
      routeData.startDestination === "" ||
      routeData.endDestination === "" ||
      routeData.noOfSections === "" ||
      routeData.permitExpDate === null ||
      routeData.permitExpDate === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const year = routeData.permitExpDate.year();
      const month = routeData.permitExpDate.month() + 1;
      const day = routeData.permitExpDate.date();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const form = new FormData();
      form.append("file", file);

      axios
        .post(
          `http://localhost:8081/api/v1/route/add?startDestination=${routeData.startDestination}&endDestination=${routeData.endDestination}&distance=${routeData.distance}&noOfSections=${routeData.noOfSections}&permitExpDate=${formattedDate}`,
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
          console.log("Data successfully posted:", response.data);
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
      clear();
      setRefresh(!refresh);
      Swal.fire({
        title: "Good job!",
        text: "Route Added Successfully!",
        icon: "success",
      });
    }
  };

  const handleSearchInputChange = async (event) => {
    setSearchInput(event.target.value);
  };

  const UpdateRoute = () => {
    if (
      routeData.distance === null ||
      routeData.startDestination === "" ||
      routeData.endDestination === "" ||
      routeData.noOfSections === "" ||
      routeData.permitExpDate === null ||
      routeData.permitExpDate === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const updateData = {
        ...routeData,
        routeId: routeId,
      };

      const year = routeData.permitExpDate.year();
      const month = routeData.permitExpDate.month() + 1;
      const day = routeData.permitExpDate.date();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const form = new FormData();
      form.append("file", file);
      axios
        .post(
          `http://localhost:8081/api/v1/route/edit?routeId=${updateData.routeId}&startDestination=${routeData.startDestination}&endDestination=${routeData.endDestination}&distance=${routeData.distance}&noOfSections=${routeData.noOfSections}&permitExpDate=${formattedDate}`,
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
          console.log("Data successfully Edited:", response.data);
          console.log(file);
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
      setRefresh(!refresh);
      clear();
      Swal.fire({
        title: "Good job!",
        text: "Route Information Updated Successfully!",
        icon: "success",
      });
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
        axios
          .delete(`http://localhost:8081/api/v1/route/remove?routeId=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Data successfully deleted:", response.data);
          })
          .catch((error) => {
            console.error("Error deleting data:", error.message);
          });
        setRefresh(!refresh);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
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

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/route/findRoutes?pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}&startDestination=${searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = response.data.content.map((routeData) => ({
          id: routeData.routeId,
          startDestination: routeData.startDestination,
          endDestination: routeData.endDestination,
          distance: routeData.distance,
          noOfSections: routeData.noOfSections,
          permitExpDate: routeData.permitExpDate.split("T")[0],
        }));
        console.log(formattedData);

        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: formattedData,
          total: response.data.totalElements,
        }));
      } catch (error) {
        console.error("There was an error!", error);
        setPageState((old) => ({
          ...old,
          isLoading: false,
        }));
      }
    };

    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, searchInput, refresh]);

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
              label="Search by Start Destination"
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
              />
            </ThemeProvider>
          </div>
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
                id="startDestination"
                class="form-control input-field"
                value={routeData.startDestination}
                onChange={handleChange}
              />
            </div>
            <div className="input-and-label">
              <label class="form-label">End Destination*</label>
              <input
                type="text"
                id="endDestination"
                class="form-control input-field"
                value={routeData.endDestination}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap  justify-content-between two-fields">
            <div className="input-and-label">
              <label class="form-label">Distance*</label>
              <input
                type="text"
                id="distance"
                class="form-control input-field"
                value={routeData.distance}
                onChange={handleChange}
                onKeyPress={(event) => {
                  const char = String.fromCharCode(event.charCode);
                  if (!/^\d|\.$|^[-]/.test(char)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div className="input-and-label">
              <label class="form-label">Number of Sections*</label>
              <input
                type="text"
                id="noOfSections"
                class="form-control input-field"
                value={routeData.noOfSections}
                onChange={handleChange}
                onKeyPress={(event) => {
                  const char = String.fromCharCode(event.charCode);
                  if (!/^\d|\.$|^[-]/.test(char)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="choosefile-expiredate">
            <div className="d-flex flex-column input-and-label">
              <label class="form-label">Permite Expire Date*</label>
              <ThemeProvider theme={datepicker_theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ field: { clearable: true } }}
                    sx={{ width: 300 }}
                    value={value}
                    onChange={async (newValue) =>
                      await setRouteDate(
                        {
                          ...routeData,
                          permitExpDate: newValue,
                        },
                        setValue(newValue)
                      )
                    }
                    id="permitExpDate"
                  />
                </LocalizationProvider>
              </ThemeProvider>
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
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between two-fields">
            <Button
              style={buttonStyle_Add}
              className="d-flex  update-btn"
              variant="contained"
              disabled={isAddButtonDisabled}
              onClick={AddRoute}
            >
              Add Route
            </Button>
            <Button
              style={{
                borderRadius: 10,
                margin: 30,
                backgroundColor: "#ff760d",
                color: "white",
              }}
              className="d-flex  update-btn"
              variant="contained"
              onClick={clear}
              disabled={false}
            >
              Clear
            </Button>
            <Button
              style={buttonStyle_Update}
              className="d-flex  update-btn"
              variant="contained"
              disabled={isUpdateButtonDisabled}
              onClick={UpdateRoute}
            >
              Update Route
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Route_Management;
