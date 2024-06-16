import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoIosFolderOpen } from "react-icons/io";
function Fleet_Operation() {
  const token = localStorage.getItem("token");
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
    { field: "id", headerName: "Bus ID", width: 100 },
    { field: "bustype", headerName: "Bus Type", width: 120 },
    {
      field: "numberplate",
      headerName: "Number Plate",
      width: 150,
    },
    {
      field: "lastservicedate",
      headerName: "Last Service Date",
      width: 150,
    },
    {
      field: "regno",
      headerName: "Registration No",
      width: 130,
    },
    {
      field: "docId",
      headerName: "Document ID",
      width: 100,
    },
    {
      field: "docName",
      headerName: "Document name",
      width: 230,
    },
    {
      field: "numberofseats",
      headerName: "Seats",
      width: 100,
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

  const [value, setValue] = useState(null);
  const [value_date, setValue_date] = useState(null);
  const inputRef = useRef(null);
  const [refresh, setRefresh] = useState(true);
  const [busData, setBusDate] = useState({
    type: "NORMAL",
    numberPlate: null,
    lastServiceDate: null,
    Seats: null,
    regNo: null,
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
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

  const [busId, setBusId] = useState("");
  const handleEdit = (e) => {
    setValue(e.bustype);
    const updatedId = e.id;
    setBusId(updatedId);
    setValue_date(dayjs(e.lastservicedate));
    setBusDate({
      type: e.bustype,
      numberPlate: e.numberplate,
      lastServiceDate: dayjs(e.lastservicedate),
      Seats: e.numberofseats,
      regNo: e.regno,
    });

    setisUpdateButtonDisabled(false);
    setisAddButtonDisabled(true);
    console.log(busId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/bus/findBuses?pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}&numberPlate=${searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = response.data.content.map((busData) => ({
          id: busData.busId,
          bustype: busData.type,
          numberplate: busData.numberPlate,
          numberofseats: busData.seats,
          regno: busData.regNo,
          lastservicedate: busData.lastServiceDate.split("T")[0],
          docId: busData.docId,
          docName: busData.docName,
        }));
        console.log(response);

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
    console.log(file);
    console.log(busData.lastServiceDate);

    fetchData();
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchInput,
    refresh,
    token,
    file,
    busData,
  ]);

  useEffect(() => {
    console.log(file);
    console.log(busData);
  }, [file, busId, busData]);

  const navigate = useNavigate();
  const handleOpen = async (row) => {
    console.log(row);
    if (row.docId != null) {
      navigate("/filelibrary/BUS DOCUMENT", {
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
        axios
          .delete(`http://localhost:8081/api/v1/bus/remove?busId=${id}`, {
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
            console.error("Error deleting data:", error.message);
          });
      }
    });
  };

  const clear = () => {
    if (inputRef.current.value) {
      inputRef.current.value = null;
    }
    console.log("clear");
    setFile(null);
    setValue("NORMAL");

    setValue_date(null);
    setBusDate({
      type: "NORMAL",
      numberPlate: "",
      lastServiceDate: "",
      Seats: "",
      regNo: "",
    });

    setisUpdateButtonDisabled(true);
    setisAddButtonDisabled(false);
  };

  const AddBus = () => {
    if (
      busData.type === null ||
      busData.numberPlate === "" ||
      busData.lastServiceDate === "" ||
      busData.lastServiceDate === null ||
      busData.seats === "" ||
      busData.regNo === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      console.log(busData.lastServiceDate);
      const year = busData.lastServiceDate.year();
      const month = busData.lastServiceDate.month() + 1;
      const day = busData.lastServiceDate.date();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const form = new FormData();
      form.append("file", file);
      console.log(file);

      axios
        .post(
          `http://localhost:8081/api/v1/bus/add?type=${busData.type}&numberPlate=${busData.numberPlate}&lastServicedDate=${formattedDate}&seats=${busData.Seats}&regNo=${busData.regNo}`,
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
          Swal.fire({
            title: "Good job!",
            text: "Bus Added Successfully!",
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

  const UpdateBusData = () => {
    if (
      busData.type === null ||
      busData.numberPlate === "" ||
      busData.lastServiceDate === "" ||
      busData.lastServiceDate === null ||
      busData.seats === "" ||
      busData.regNo === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const updateData = {
        ...busData,
        busId: busId,
      };
      console.log("dasda", busData.lastServiceDate);
      const year = busData.lastServiceDate.year();
      const month = busData.lastServiceDate.month() + 1;
      const day = busData.lastServiceDate.date();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const form = new FormData();
      form.append("file", file);

      axios
        .post(
          `http://localhost:8081/api/v1/bus/edit?busId=${updateData.busId}&type=${busData.type}&numberPlate=${busData.numberPlate}&lastServicedDate=${formattedDate}&seats=${busData.Seats}&regNo=${busData.regNo}`,
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
        .then(async function (response) {
          await Swal.fire({
            title: "Good job!",
            text: "Bus Detailed Updated Successfully!",
            icon: "success",
          });
          setRefresh(!refresh);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
          });
          console.error("Error posting data:", error);
        });

      clear();
    }
  };

  const handleChange = (e) => {
    const value_ = e.target.value;
    setBusDate({
      ...busData,
      [e.target.id]: value_,
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <h1 className="pb-4">Fleet Operations</h1>
        <div
          style={{ width: "80%" }}
          className="d-flex flex-wrap-reverse align-items-center  justify-content-between"
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
        <div className="trip-main-container ">
          <div className="pair-container justify-content-between">
            <div className="input-and-label">
              <label className="form-label">Number Plate*</label>
              <input
                type="text"
                id="numberPlate"
                className="form-control input-field-trip"
                value={busData.numberPlate}
                onChange={handleChange}
              />
            </div>

            <div className="input-and-label">
              <label className="form-label">Registration No*</label>
              <input
                type="text"
                id="regNo"
                className="form-control input-field-trip"
                value={busData.regNo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="pair-container justify-content-between">
            <div className="input-and-label">
              <label className="form-label">Number of Seats*</label>
              <input
                type="text"
                id="Seats"
                className="form-control input-field-trip"
                value={busData.Seats}
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
              <label className="form-label">Bus Type*</label>
              <select
                id="type"
                className="form-select input-field-trip"
                value={value}
                onChange={(newValue) => {
                  setBusDate((prevState) => ({
                    ...prevState,
                    type: newValue.target.value,
                  }));
                  setValue(newValue.target.value);
                  console.log("one change date", busData.type);
                }}
              >
                <option value="NORMAL">NORMAL</option>
                <option value="SEMI_LUXURY">SEMI_LUXURY</option>
                <option value="LUXURY">LUXURY</option>
              </select>
            </div>
          </div>
          <div className="pair-container justify-content-between align-items-end">
            <div className="d-flex flex-column input-and-label">
              <label className="form-label">Service Date*</label>
              <ThemeProvider theme={datepicker_theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 200 }}
                    slotProps={{ field: { clearable: true } }}
                    value={value_date}
                    onChange={(newValue) => {
                      setBusDate((prevState) => ({
                        ...prevState,
                        lastServiceDate: newValue,
                      }));

                      setValue_date(newValue);
                      console.log("one change date", busData.lastServiceDate);
                    }}
                    id="lastServiceDate"
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
              className="input-group "
            >
              <input
                type="file"
                className="form-control input-field-choosefile "
                id="inputGroupFile02"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap mt-4 justify-content-between two-fields">
            <Button
              style={buttonStyle_Add}
              className="d-flex  update-btn"
              variant="contained"
              disabled={isAddButtonDisabled}
              onClick={AddBus}
            >
              Add Bus
            </Button>
            <Button
              style={{
                borderRadius: 10,
                width: 200,
                margin: 20,
                backgroundColor: "#ff760d",
                color: "white",
              }}
              className="d-flex  update-btn"
              variant="contained"
              onClick={clear}
            >
              Clear
            </Button>
            <Button
              style={buttonStyle_Update}
              className="d-flex  update-btn"
              variant="contained"
              disabled={isUpdateButtonDisabled}
              onClick={UpdateBusData}
            >
              Update Bus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fleet_Operation;
