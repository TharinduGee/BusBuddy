import React, { useState, useEffect } from "react";
import "./Trip_Management.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import { format } from "date-fns";
import TripScheduleStepper from "../../Components/OwnerPageComponents/TripManagement/TripScheduleStepper";

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
      field: "conductorId",
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

  //to clear the selected field text
  const [routeIdfield, setrouteIdset] = useState("");
  const [driverIdfield, setdriverIdset] = useState("");
  const [busIdfield, setbusIdset] = useState("");
  const [conducterIdfield, setconducterIdset] = useState("");
  const clear = () => {
    setrouteIdset(null);
    setdriverIdset(null);
    setbusIdset(null);
    setconducterIdset(null);
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
  }, [
    searchDates,
    paginationModel.page,
    paginationModel.pageSize,
    refresh,
    token,
  ]);

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
        conductorId: tripData.condocterId,
        expense: tripData.expense,
      };
      console.log(
        passingData.conductorId,
        " sdadasd   ",
        passingData.busId,
        " passing data"
      );
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
          setRefresh(!refresh);
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
      clear();
    }
  };

  const AddTripForADuration = () => {
    if (
      tripData.startTime === null ||
      tripData.endTime === null ||
      tripData.busId === "" ||
      tripData.driverId === "" ||
      tripData.condocterId === null ||
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
          conductorId: tripData.condocterId,
          expense: tripData.expense,
        },
        lastDate: lastformattedDate,
      };

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
            setTimeout(function () {
              setRefresh(!refresh);
            }, 90);
            setRefresh(!refresh);
          })
          .catch((error) => {
            console.error("Error deleting data:", error.message);
          });
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
        className="justify-content-center align-items-center d-flex "
        style={{ width: "100%" }}
      >
        <TripScheduleStepper />
      </div>
    </div>
  );
}

export default Trip_Management;
