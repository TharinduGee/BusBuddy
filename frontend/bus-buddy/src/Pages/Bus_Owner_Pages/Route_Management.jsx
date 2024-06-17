import React, { useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { IoIosFolderOpen } from "react-icons/io";

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
    width: "200px",
  };

  const buttonStyle_Add = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: isAddButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
    width: "200px",
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
    { field: "id", headerName: "Route ID", width: 100, type: "text" },
    {
      field: "startDestination",
      headerName: "Start Destination",
      type: "text",
      width: 150,
    },
    {
      field: "endDestination",
      headerName: "End Destination",
      type: "text",
      width: 150,
    },
    {
      field: "distance",
      headerName: "Distance",
      type: "text",
      width: 100,
    },
    {
      field: "noOfSections",
      headerName: "Sections",
      type: "text",
      width: 100,
    },
    {
      field: "permitExpDate",
      type: "text",
      headerName: "Permite Expire Date",
      width: 170,
    },
    {
      field: "docId",
      type: "text",
      headerName: "Document ID",
      width: 100,
    },
    {
      field: "docName",
      type: "text",
      headerName: "Document Name",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
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

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [refresh, setRefresh] = useState(true);
  const [value, setValue] = useState(null);
  const inputRef = useRef(null);
  const [routeId, setrouteId] = useState("");
  const [fileName, setfileName] = useState("");
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
    setfileName(e.docName);
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
    if (inputRef.current.value) {
      inputRef.current.value = null;
    }
    setfileName("");
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
  useEffect(() => {
    console.log(file);
    console.log(routeData.permitExpDate);
  }, [file, routeData.permitExpDate]);

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
          Swal.fire({
            title: "Good job!",
            text: "Route Added Successfully!",
            icon: "success",
          });
          console.log("Data successfully posted:", response.data);
          setRefresh(!refresh);
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
    }
  };

  const handleSearchInputChange = async (event) => {
    setSearchInput(event.target.value);
  };

  const navigate = useNavigate();
  const handleOpen = async (row) => {
    console.log(row);
    if (row.docId != null) {
      navigate("/filelibrary/ROUTE PERMIT", {
        state: { id: row.docId, docName: row.docName },
      });
    } else {
      Swal.fire("Error", "No Document to Open", "error");
    }
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
          Swal.fire({
            title: "Good job!",
            text: "Route Information Updated Successfully!",
            icon: "success",
          });
          setRefresh(!refresh);
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });

      clear();
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
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setRefresh(!refresh);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.error("Error deleting data:", error.message);
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

        console.log(response);
        const formattedData = response.data.content.map((routeData) => ({
          id: routeData.routeId,
          startDestination: routeData.startDestination,
          endDestination: routeData.endDestination,
          distance: routeData.distance,
          noOfSections: routeData.noOfSections,
          permitExpDate: routeData.permitExpDate.split("T")[0],
          docId: routeData.docId,
          docName: routeData.docName,
        }));

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
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchInput,
    refresh,
    token,
  ]);

  return (
    <div>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <h1 className="pb-4">Route Managment</h1>
        <div
          style={{ width: "80%" }}
          className="d-flex flex-wrap-reverse align-items-center  justify-content-between"
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
                  width: 250,
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
              <label className="form-label">Start Destination*</label>
              <input
                type="text"
                id="startDestination"
                className="form-control input-field"
                value={routeData.startDestination}
                onChange={handleChange}
              />
            </div>
            <div className="input-and-label">
              <label className="form-label">End Destination*</label>
              <input
                type="text"
                id="endDestination"
                className="form-control input-field"
                value={routeData.endDestination}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap  justify-content-between two-fields">
            <div className="input-and-label">
              <label className="form-label">Distance*</label>
              <input
                type="number"
                id="distance"
                className="form-control input-field"
                value={routeData.distance}
                onChange={handleChange}
              />
            </div>
            <div className="input-and-label">
              <label className="form-label">Number of Sections*</label>
              <input
                type="number"
                id="noOfSections"
                className="form-control input-field"
                value={routeData.noOfSections}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="choosefile-expiredate">
            <div className="d-flex flex-column input-and-label">
              <label className="form-label">Permite Expire Date*</label>
              <ThemeProvider theme={datepicker_theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ field: { clearable: true } }}
                    sx={{ width: 200 }}
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
                width: 300,
                margin: 30,
                marginBottom: 1,
              }}
              className="input-group "
            >
              <div className="d-flex flex-column align-items-center">
                <input
                  type="file"
                  className="form-control input-field-choosefile "
                  id="inputGroupFile02"
                  onChange={handleFileChange}
                  ref={inputRef}
                />
                <div className="normal-details-filename">{fileName}</div>
              </div>
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
                width: "200px",
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
