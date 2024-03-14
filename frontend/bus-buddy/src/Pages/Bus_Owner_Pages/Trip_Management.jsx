import React, { useState, useEffect, useRef } from "react";
import "./Trip_Management.css";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { IoIosArrowBack } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import { format } from "date-fns";
import dayjs from "dayjs";

function Trip_Management() {
  const buttonStyle = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: "#ff760d",
    color: "white",
  };
  const [tripData, setTripData] = useState({
    startTime: null,
    endTime: null,
    busId: null,
    routeId: null,
    driverId: null,
    condocterId: null,
    income: null,
    expense: null,
    date: null,
  });

  const [durationDates, setDurationDates] = useState({
    firstDate: null,
    lastDate: null,
  });
  const [searchDates, setsearchDates] = useState({
    firstDate: null,
    lastDate: null,
  });
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
  const [busIDoptions, setbusIDoptions] = useState([]);
  const [routeIDoptions, setrouteIDoptions] = useState([]);
  const [driverIDoptions, setdriverIDoptions] = useState([]);
  const [ConductorIDoptions, setConductorIDoptions] = useState([]);
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

  const text_box_the = createTheme({
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
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "startTime", headerName: "Start Time", width: 130 },
    {
      field: "endTime",
      headerName: "End Time",
      width: 90,
    },
    {
      field: "income",
      headerName: "Income",
      width: 90,
    },
    {
      field: "expense",
      headerName: "Expenses",
      width: 90,
    },
    {
      field: "busId",
      headerName: "Bus ID",
      width: 90,
    },
    {
      field: "routeId",
      headerName: "Route ID",
      width: 90,
    },
    {
      field: "driverId",
      headerName: "Driver ID",
      width: 90,
    },
    {
      field: "condocterId",
      headerName: "Conductor ID",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
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
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleChange = (e) => {
    const value_ = e.target.value;
    setTripData({
      ...tripData,
      [e.target.id]: value_,
    });

    console.log(tripData);
  };

  const clear = () => {
    setTripData({
      startTime: null,
      endTime: null,
      busId: null,
      routeId: null,
      driverId: null,
      condocterId: null,
      income: "",
      expense: "",
      date: null,
    });
    setDurationDates({
      firstDate: null,
      lastDate: null,
    });
  };

  useEffect(() => {
    console.log("sdsad", searchDates.lastDate);
    if (searchDates.firstDate !== null && searchDates.lastDate !== null) {
      console.log("inside", searchDates.lastDate);
      const fyear = searchDates.firstDate.year();
      const fmonth = searchDates.firstDate.month() + 1;
      const fday = searchDates.firstDate.date();
      const firstformattedDate = `${fyear}-${String(fmonth).padStart(
        2,
        "0"
      )}-${String(fday).padStart(2, "0")}`;

      const lyear = searchDates.lastDate.year();
      const lmonth = searchDates.lastDate.month() + 1;
      const lday = searchDates.lastDate.date();
      const lastformattedDate = `${lyear}-${String(lmonth).padStart(
        2,
        "0"
      )}-${String(lday).padStart(2, "0")}`;

      const fetchData = async () => {
        setPageState((old) => ({
          ...old,
          isLoading: true,
        }));

        try {
          const response = await axios.get(
            `http://localhost:8081/api/v1/trip/findTrips?pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}&startDate=${firstformattedDate}&endDate=${lastformattedDate}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const formattedData = response.data.content.map((tripdata) => ({
            id: tripdata.tripId,
            date: tripdata.date,
            startDestination: tripdata.startDestination,
            endDestination: tripdata.endDestination,
            startTime: tripdata.startTime,
            endTime: tripdata.endTime,
            income: tripdata.income,
            expense: tripdata.expense,
            driverId: tripdata.driverId,
            conductorId: tripdata.conductorId,
            busId: tripdata.busId,
            routeId: tripdata.routeId,
            status: tripdata.status,
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
    }
  }, [searchDates, paginationModel.page, paginationModel.pageSize, refresh]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8081/api/v1/bus/getBusIds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const busIDs = response.data;

          const newOptions = busIDs.map((id) => ({ value: id, label: id }));
          setbusIDoptions(newOptions);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
    try {
      axios
        .get(`http://localhost:8081/api/v1/route/geRouteIds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const busIDs = response.data;

          const newOptions = busIDs.map((id) => ({ value: id, label: id }));
          setrouteIDoptions(newOptions);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
    try {
      axios
        .get(`http://localhost:8081/api/v1/employee/getDriverIds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const busIDs = response.data;

          const newOptions = busIDs.map((id) => ({ value: id, label: id }));
          setdriverIDoptions(newOptions);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
    try {
      axios
        .get(`http://localhost:8081/api/v1/employee/getConductorIds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const busIDs = response.data;

          const newOptions = busIDs.map((id) => ({ value: id, label: id }));
          setConductorIDoptions(newOptions);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
    console.log(durationDates);
  }, [durationDates, tripData]);

  const AddTrip = () => {
    if (checked) {
      AddTripForADuration();
      console.log("duration");
    } else {
      AddTripForTheDate();
      console.log("notduration");
    }
  };
  const AddTripForTheDate = () => {
    if (
      tripData.startTime === null ||
      tripData.endTime === null ||
      tripData.busId === "" ||
      tripData.driverId === "" ||
      tripData.condocterId === "" ||
      tripData.income === "" ||
      tripData.expense === "" ||
      tripData.date === "" ||
      tripData.date === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const year = tripData.date.year();
      const month = tripData.date.month() + 1;
      const day = tripData.date.date();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const jsStartTime = tripData.startTime.toDate();
      const formattedStartTime = format(jsStartTime, "HH:mm:ss");

      const jsEndTime = tripData.endTime.toDate();
      const formattedEndTime = format(jsEndTime, "HH:mm:ss");
      const passingData = {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        income: tripData.income,
        busId: tripData.busId,
        routeId: tripData.routeId,
        driverId: tripData.driverId,
        condocterId: tripData.condocterId,
        expense: tripData.expense,
      };
      axios
        .post(
          `http://localhost:8081/api/v1/trip/add?date=${formattedDate}`,
          passingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log("Data successfully posted:", response.data);
          Swal.fire({
            title: "Good job!",
            text: "Trip Data Inserted Successfully!",
            icon: "success",
          });
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
      clear();
    }
    setRefresh(!refresh);
  };

  const AddTripForADuration = () => {
    if (
      tripData.startTime === null ||
      tripData.endTime === null ||
      tripData.busId === "" ||
      // tripData.driverId === "" ||
      // tripData.condocterId === null ||
      tripData.income === "" ||
      tripData.expense === "" ||
      durationDates.firstDate === "" ||
      durationDates.lastDate === "" ||
      durationDates.lastDate === null ||
      durationDates.firstDate === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const fyear = durationDates.firstDate.year();
      const fmonth = durationDates.firstDate.month() + 1;
      const fday = durationDates.firstDate.date();
      const firstformattedDate = `${fyear}-${String(fmonth).padStart(
        2,
        "0"
      )}-${String(fday).padStart(2, "0")}`;

      const lyear = durationDates.lastDate.year();
      const lmonth = durationDates.lastDate.month() + 1;
      const lday = durationDates.lastDate.date();
      const lastformattedDate = `${lyear}-${String(lmonth).padStart(
        2,
        "0"
      )}-${String(lday).padStart(2, "0")}`;

      const jsStartTime = tripData.startTime.toDate();
      const formattedStartTime = format(jsStartTime, "HH:mm:ss");

      const jsEndTime = tripData.endTime.toDate();
      const formattedEndTime = format(jsEndTime, "HH:mm:ss");
      const passingData = {
        firstDate: firstformattedDate,
        tripAddRequest: {
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          income: tripData.income,
          busId: tripData.busId,
          routeId: tripData.routeId,
          driverId: tripData.driverId,
          condocterId: tripData.condocterId,
          expense: tripData.expense,
        },
        lastDate: lastformattedDate,
      };

      console.log(passingData);
      axios
        .post(
          `http://localhost:8081/api/v1/trip/scheduleTripsForDuration`,
          passingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log("Data successfully posted:", response.data);
          Swal.fire({
            title: "Good job!",
            text: "Trip Data Inserted Successfully!",
            icon: "success",
          });
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
      clear();
      setRefresh(!refresh);
    }
  };

  const [checked, setChecked] = useState(false);

  const handleChangecheck = (event) => {
    setChecked(event.target.checked);
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
          .delete(`http://localhost:8081/api/v1/trip/remove?tripId=${id}`, {
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
          class="d-flex flex-wrap align-items-center  justify-content-start"
        >
          <div className="d-flex flex-column input-and-label mt-3 ">
            <label class="form-label">Starting Date*</label>
            <ThemeProvider theme={text_box_the}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 200 }}
                  slotProps={{ field: { clearable: true } }}
                  value={searchDates.firstDate}
                  onChange={async (newValue) =>
                    await setsearchDates(
                      {
                        ...searchDates,
                        firstDate: newValue,
                      },
                      console.log(searchDates)
                    )
                  }
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>

          <div className="d-flex flex-column input-and-label mt-3  ">
            <label class="form-label">Ending Date*</label>
            <ThemeProvider theme={text_box_the}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 200 }}
                  slotProps={{ field: { clearable: true } }}
                  value={searchDates.lastDate}
                  onChange={async (newValue) =>
                    await setsearchDates(
                      {
                        ...searchDates,
                        lastDate: newValue,
                      },
                      console.log(searchDates)
                    )
                  }
                />
              </LocalizationProvider>
            </ThemeProvider>
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
            <div className="d-flex flex-column input-and-label">
              <label class="form-label">Start Time*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={tripData.startTime}
                    sx={{ width: 200 }}
                    onChange={async (newValue) =>
                      await setTripData(
                        {
                          ...tripData,
                          startTime: newValue,
                        },
                        console.log(tripData)
                      )
                    }
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>

            <div className="d-flex flex-column input-and-label">
              <label class="form-label">End Time*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    sx={{ width: 200 }}
                    value={tripData.endTime}
                    onChange={async (newValue) =>
                      await setTripData(
                        {
                          ...tripData,
                          endTime: newValue,
                        },
                        console.log(tripData)
                      )
                    }
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </div>
          <div className="pair-container">
            <div className="input-and-label">
              <label class="form-label">Income*</label>
              <input
                type="text"
                id="income"
                class="form-control input-field-trip"
                value={tripData.income}
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
              <label class="form-label">Expense*</label>
              <input
                type="text"
                id="expense"
                class="form-control input-field-trip"
                value={tripData.expense}
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
          <div className="pair-container">
            <div className="input-and-label">
              <label class="form-label">Bus*</label>
              <Select
                id="busId"
                className="input-field-trip"
                options={busIDoptions}
                isClearable={true}
                onChange={async (newValue) => {
                  if (newValue !== null) {
                    await setTripData({
                      ...tripData,
                      busId: newValue.value,
                    });
                    console.log(tripData);
                  } else {
                    await setTripData({
                      ...tripData,
                      busId: newValue,
                    });
                    console.log(tripData);
                  }
                }}
              />
            </div>

            <div className="input-and-label">
              <label class="form-label">Route*</label>
              <Select
                id="routeId"
                className="input-field-trip"
                options={routeIDoptions}
                isClearable={true}
                onChange={async (newValue) => {
                  if (newValue !== null) {
                    await setTripData({
                      ...tripData,
                      routeId: newValue.value,
                    });
                    console.log(tripData);
                  } else {
                    await setTripData({
                      ...tripData,
                      routeId: newValue,
                    });
                    console.log(tripData);
                  }
                }}
              />
            </div>
          </div>
          <div className="pair-container ">
            <div className="input-and-label">
              <label class="form-label">Driver*</label>
              <Select
                id="driverId"
                className="input-field-trip"
                options={driverIDoptions}
                isClearable={true}
                onChange={async (newValue) => {
                  if (newValue !== null) {
                    await setTripData({
                      ...tripData,
                      driverId: newValue.value,
                    });
                    console.log(tripData);
                  } else {
                    await setTripData({
                      ...tripData,
                      driverId: newValue,
                    });
                    console.log(tripData);
                  }
                }}
              />
            </div>

            <div className="input-and-label ">
              <label class="form-label">Conductor*</label>
              <Select
                id="condocterId"
                className="input-field-trip"
                options={ConductorIDoptions}
                isClearable={true}
                onChange={async (newValue) => {
                  if (newValue !== null) {
                    await setTripData({
                      ...tripData,
                      condocterId: newValue.value,
                    });
                    console.log(tripData);
                  } else {
                    await setTripData({
                      ...tripData,
                      condocterId: newValue,
                    });
                    console.log(tripData);
                  }
                }}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div
              className={
                checked == true
                  ? "hidden-schedule"
                  : "d-flex flex-column align-items-start input-and-label mt-4 "
              }
            >
              <label class="form-label">Date*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 200 }}
                    slotProps={{ field: { clearable: true } }}
                    value={tripData.date}
                    onChange={async (newValue) =>
                      await setTripData(
                        {
                          ...tripData,
                          date: newValue,
                        },
                        console.log(tripData)
                      )
                    }
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </div>

          <div
            className={
              checked == true
                ? "pair-container mt-4"
                : "pair-container  hidden-schedule"
            }
          >
            <div className="d-flex flex-column input-and-label mt-1 ">
              <label class="form-label">Starting Date*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 200 }}
                    slotProps={{ field: { clearable: true } }}
                    value={durationDates.firstDate}
                    onChange={async (newValue) =>
                      await setDurationDates(
                        {
                          ...durationDates,
                          firstDate: newValue,
                        },
                        console.log(durationDates)
                      )
                    }
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>

            <div className="d-flex flex-column input-and-label mt-1  ">
              <label class="form-label">Ending Date*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 200 }}
                    slotProps={{ field: { clearable: true } }}
                    value={durationDates.lastDate}
                    onChange={async (newValue) =>
                      await setDurationDates(
                        {
                          ...durationDates,
                          lastDate: newValue,
                        },
                        console.log(durationDates)
                      )
                    }
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </div>
          <div className="schedule-tick">
            <Checkbox checked={checked} onChange={handleChangecheck} />
            <label class="form-label">Schedule Trip for a Time Duration</label>
          </div>
          <div className="d-flex justify-content-center ">
            <Button
              style={buttonStyle}
              className="d-flex  update-btn"
              variant="contained"
              onClick={AddTrip}
            >
              ADD TRIP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trip_Management;
