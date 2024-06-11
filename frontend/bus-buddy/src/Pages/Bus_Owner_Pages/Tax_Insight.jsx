import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import "./Route_Management.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { orange } from "@mui/material/colors";

function Tax_Insight() {
  const buttonStyle_Add = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: "#ff760d",
    color: "white",
  };

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

  const customTheme = createTheme({
    palette: {
      primary: {
        main: orange[800],
      },
      secondary: {
        main: orange[600],
      },
    },
    components: {
      MuiStepLabel: {
        styleOverrides: {
          label: {
            "&.Mui-active": {
              color: orange[800],
            },
            "&.Mui-completed": {
              color: orange[600],
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            "&.Mui-active": {
              color: orange[800],
            },
            "&.Mui-completed": {
              color: orange[600],
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: orange[100],
            },
          },
        },
      },
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "Transaction ID",
      width: 130,
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 130,
      type: "number",
    },
    { field: "timestamp", headerName: "Date and Time", flex: 1, minWidth: 130 },
    {
      field: "transaction_name",
      headerName: "Transaction name",

      flex: 1,
      minWidth: 80,
    },
    {
      field: "refId",
      headerName: "Reference ID",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    { field: "docId", flex: 1, headerName: "Document ID", minWidth: 150 },
    {
      field: "transactionType",
      flex: 1,
      headerName: "Transaction Type",
      minWidth: 150,
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

  const [formValues, setFormValues] = useState({
    type: "",
    name: "",
    amount: "",
    refId: "",
  });

  const TransactionType = [
    "TRANSACTION_TYPE_TICKET_INCOME",
    "TRANSACTION_TYPE_TICKET_EXPENSE",
    "TRANSACTION_TYPE_UNSPECIFIED",
    "TRANSACTION_TYPE_SERVICE",
    "TRANSACTION_TYPE_EMPLOYEE_SALARY",
  ];

  const validationSchema = Yup.object({
    type: Yup.string().required("Transaction type is required"),
    name: Yup.string().required("Transaction name is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    refId: Yup.string().when("type", {
      is: "TRANSACTION_TYPE_UNSPECIFIED",
      then: (validationSchema) => validationSchema.optional(),
      otherwise: (validationSchema) => validationSchema.required(),
    }),
  });

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));

      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/ledger/findAll?pageNo=${paginationModel.page}&pageSize=${paginationModel.pageSize}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response.data);

        const formattedData = response.data.content.map((ledgerData) => ({
          id: ledgerData.transactionId,
          amount: ledgerData.amount,
          timestamp: ledgerData.time.split("T")[0],
          transaction_name: ledgerData.transactionName,
          refId: ledgerData.refId,
          transactionType: ledgerData.transactionType.split("E_")[1],
          docId: ledgerData.docId,
        }));

        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: formattedData,
          total: response.data.totalElements,
        }));
      } catch (error) {
        console.error("There was an error!", error);
        setPageState((old) => ({ ...old, isLoading: false }));
      }
    };

    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, refresh, token]);

  return (
    <div>
      <h1>Tax Insight</h1>
      <div className="d-flex justify-content-center">
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

      <div
        className="justify-content-center align-items-center d-flex py-4"
        style={{ width: "100%" }}
      >
        <div className="op-main-container">
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await axios.post(
                  `http://localhost:8081/api/v1/ledger/addEntry`,
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                console.log("Data successfully posted:", response.data);
                Swal.fire({
                  title: "Good job!",
                  text: "Ledger Data Inserted Successfully!",
                  icon: "success",
                });
                setRefresh(!refresh);
                resetForm();
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response.data,
                });
              }

              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="d-flex flex-wrap justify-content-lg-between justify-content-md-center  w-100 px-5 ">
                  <FormControl className="pt-5  pe-3" sx={{ width: "300px" }}>
                    <label className="form-label">
                      Transaction Type<span className="text-danger">*</span>
                    </label>
                    <Select
                      labelId="transaction-type-label"
                      id="type"
                      name="type"
                      value={values.type}
                      onChange={(event) =>
                        setFieldValue("type", event.target.value, true)
                      }
                      error={touched.type && Boolean(errors.type)}
                    >
                      {TransactionType.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item.split("E_")[1]}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.type && errors.type && (
                      <Typography color="error">{errors.type}</Typography>
                    )}
                  </FormControl>

                  <div className="d-flex flex-column pt-5">
                    <label className="form-label">
                      Transaction Name<span className="text-danger">*</span>
                    </label>
                    <TextField
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      className="form-control input-field"
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-lg-between justify-content-md-center  w-100 px-5 ">
                  <div className="d-flex flex-column pt-5  pe-3">
                    <label className="form-label">
                      Amount<span className="text-danger">*</span>
                    </label>
                    <TextField
                      type="number"
                      id="amount"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.amount && Boolean(errors.amount)}
                      helperText={touched.amount && errors.amount}
                      className="form-control input-field"
                    />
                  </div>
                  {values.type !== "TRANSACTION_TYPE_UNSPECIFIED" && (
                    <div className="d-flex flex-column  pt-5 pe-3">
                      <label className="form-label">
                        Reference Id<span className="text-danger">*</span>
                      </label>
                      <TextField
                        type="text"
                        id="refId"
                        name="refId"
                        value={values.refId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.refId && Boolean(errors.refId)}
                        helperText={touched.refId && errors.refId}
                        className="form-control input-field"
                      />
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    style={buttonStyle_Add}
                    className="d-flex update-btn"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Add Edger Entry
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Tax_Insight;
