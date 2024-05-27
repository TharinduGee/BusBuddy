import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { orange } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const textBoxTheme = createTheme({
  shape: {
    borderRadius: 12,
  },
});

const validationSchemaStep2 = (value) => {
  if (value === "a") {
    return Yup.object().shape({
      startDate_: Yup.date().required("Date is required"),
    });
  } else if (value === "b") {
    return Yup.object().shape({
      startDate_: Yup.date().required("Start Date is required"),
      endDate_: Yup.date()
        .required("End Date is required")
        .min(Yup.ref("startDate_"), "End Date must be after Start Date"),
    });
  }
  return Yup.object();
};

const validationSchemaStep3 = Yup.object().shape({
  startTime_: Yup.date().required("Start Time is required"),
  endTime_: Yup.date()
    .required("End Time is required")
    .min(Yup.ref("startTime_"), "End Time must be after Start Time"),
});

const validationSchemaStep4 = Yup.object().shape({
  income_: Yup.number()
    .required("Income is required")
    .min(0, "Income cannot be negative"),
  expenses_: Yup.number()
    .required("Expenses are required")
    .min(0, "Expenses cannot be negative"),
});

const validationSchemaStep5 = Yup.object().shape({
  driver_: Yup.string().required("Driver is required"),
  conductor_: Yup.string().required("Conductor is required"),
  bus_: Yup.string().required("Bus is required"),
  route_: Yup.string().required("Route is required"),
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

export default function TripScheduleStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    startDate_: null,
    endDate_: null,
    startTime_: null,
    endTime_: null,
    driver_: "",
    conductor_: "",
    route_: "",
    bus_: "",
    income_: "",
    expenses_: "",
  });

  const [value, setValue] = React.useState("a");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNext = (values) => {
    setFormValues(values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (values) => {
    setFormValues(values);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormValues({
      startDate_: null,
      endDate_: null,
      startTime_: null,
      endTime_: null,
      driver_: "",
      conductor_: "",
      route_: "",
      bus_: "",
      income_: "",
      expenses_: "",
    });
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Step 1",
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            <FormControl>
              <FormLabel
                sx={{ color: orange[800] }}
                id="demo-controlled-radio-buttons-group"
              >
                Select One Option
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="a"
                  control={
                    <Radio
                      sx={{
                        color: orange[800],
                        "&.Mui-checked": {
                          color: orange[600],
                        },
                      }}
                    />
                  }
                  label="Schedule trip for a one date"
                />
                <FormControlLabel
                  value="b"
                  control={
                    <Radio
                      sx={{
                        color: orange[800],
                        "&.Mui-checked": {
                          color: orange[600],
                        },
                      }}
                    />
                  }
                  label="Schedule trip for a date duration"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1, background: orange[800] }}
              >
                Continue
              </Button>
            </div>
          </Box>
        </>
      ),
    },
    {
      label: "Step 2",
      validationSchema: validationSchemaStep2,
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            {value === "a" && (
              <>
                <label className="form-label">Date*</label>
                <ThemeProvider theme={textBoxTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="startDate_">
                      {({ field, form }) => (
                        <DatePicker
                          sx={{ width: "200px" }}
                          format="DD/MM/YYYY"
                          value={formik.values.startDate_}
                          onChange={(value) =>
                            formik.setFieldValue("startDate_", value, true)
                          }
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error:
                                formik.touched.startDate_ &&
                                Boolean(formik.errors.startDate_),
                              helperText:
                                formik.touched.startDate_ &&
                                formik.errors.startDate_,
                            },
                          }}
                        />
                      )}
                    </Field>
                  </LocalizationProvider>
                </ThemeProvider>
              </>
            )}
            {value === "b" && (
              <>
                <label className="form-label">Start Date*</label>
                <ThemeProvider theme={textBoxTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="startDate_">
                      {({ field, form }) => (
                        <DatePicker
                          sx={{ width: "200px" }}
                          format="DD/MM/YYYY"
                          value={formik.values.startDate_}
                          onChange={(value) =>
                            formik.setFieldValue("startDate_", value, true)
                          }
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error:
                                formik.touched.startDate_ &&
                                Boolean(formik.errors.startDate_),
                              helperText:
                                formik.touched.startDate_ &&
                                formik.errors.startDate_,
                            },
                          }}
                        />
                      )}
                    </Field>
                  </LocalizationProvider>
                </ThemeProvider>
                <label className="form-label">End Date*</label>
                <ThemeProvider theme={textBoxTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="endDate_">
                      {({ field, form }) => (
                        <DatePicker
                          sx={{ width: "200px" }}
                          format="DD/MM/YYYY"
                          value={formik.values.endDate_}
                          onChange={(value) =>
                            formik.setFieldValue("endDate_", value, true)
                          }
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error:
                                formik.touched.endDate_ &&
                                Boolean(formik.errors.endDate_),
                              helperText:
                                formik.touched.endDate_ &&
                                formik.errors.endDate_,
                            },
                          }}
                        />
                      )}
                    </Field>
                  </LocalizationProvider>
                </ThemeProvider>
              </>
            )}
          </div>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button
                onClick={() => handleBack(formik.values)}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </>
      ),
    },
    {
      label: "Step 3",
      validationSchema: validationSchemaStep3,
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            <>
              <label className="form-label">Start Time*</label>
              <ThemeProvider theme={textBoxTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Field name="startTime_">
                    {({ field, form }) => (
                      <TimePicker
                        sx={{ width: "200px" }}
                        format="hh:mm:ss A"
                        value={formik.values.startTime_}
                        onChange={(value) =>
                          formik.setFieldValue("startTime_", value, true)
                        }
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error:
                              formik.touched.startTime_ &&
                              Boolean(formik.errors.startTime_),
                            helperText:
                              formik.touched.startTime_ &&
                              formik.errors.startTime_,
                          },
                        }}
                      />
                    )}
                  </Field>
                </LocalizationProvider>
              </ThemeProvider>
              <label className="form-label">End Time*</label>
              <ThemeProvider theme={textBoxTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Field name="endTime_">
                    {({ field, form }) => (
                      <TimePicker
                        format="hh:mm:ss A"
                        sx={{ width: "200px" }}
                        value={formik.values.endTime_}
                        onChange={(value) =>
                          formik.setFieldValue("endTime_", value, true)
                        }
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error:
                              formik.touched.endTime_ &&
                              Boolean(formik.errors.endTime_),
                            helperText:
                              formik.touched.endTime_ && formik.errors.endTime_,
                          },
                        }}
                      />
                    )}
                  </Field>
                </LocalizationProvider>
              </ThemeProvider>
            </>
          </div>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button
                onClick={() => handleBack(formik.values)}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </>
      ),
    },
    {
      label: "Step 4",
      validationSchema: validationSchemaStep4,
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            <>
              <div className="input-and-label">
                <label className="form-label">Income</label>
                <input
                  type="number"
                  id="income_"
                  className="form-control input-field-trip"
                  value={formik.values.income_}
                  onChange={(event) =>
                    formik.setFieldValue("income_", event.target.value, true)
                  }
                />
                {formik.touched.income_ && formik.errors.income_ && (
                  <Typography color="error">{formik.errors.income_}</Typography>
                )}
              </div>
              <div className="input-and-label mb-4">
                <label className="form-label">Expenses</label>
                <input
                  type="number"
                  id="expenses_"
                  className="form-control input-field-trip"
                  value={formik.values.expenses_}
                  onChange={(event) =>
                    formik.setFieldValue("expenses_", event.target.value, true)
                  }
                />
                {formik.touched.expenses_ && formik.errors.expenses_ && (
                  <Typography color="error">
                    {formik.errors.expenses_}
                  </Typography>
                )}
              </div>
            </>
          </div>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button
                onClick={() => handleBack(formik.values)}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </>
      ),
    },
    {
      label: "Step 5",
      validationSchema: validationSchemaStep5,
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            <label className="form-label pb-2">
              Fill Below Details to Proceed
            </label>
            <Box
              className="d-flex flex-wrap justify-content-center align-items-center "
              sx={{ minWidth: 120 }}
            >
              <FormControl
                className="pe-3 pb-3"
                sx={{ width: "200px", color: orange[600] }}
              >
                <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                <Field name="driver_">
                  {({ field, form }) => (
                    <Select
                      sx={{ borderRadius: 5, color: orange[600] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.driver_}
                      label="Driver"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "driver_",
                          event.target.value,
                          true
                        )
                      }
                      error={
                        formik.touched.driver_ && Boolean(formik.errors.driver_)
                      }
                    >
                      <MenuItem value={"Driver 1"}>Driver 1</MenuItem>
                      <MenuItem value={"Driver 2"}>Driver 2</MenuItem>
                      <MenuItem value={"Driver 3"}>Driver 3</MenuItem>
                    </Select>
                  )}
                </Field>
                {formik.touched.driver_ && formik.errors.driver_ && (
                  <Typography color="error">{formik.errors.driver_}</Typography>
                )}
              </FormControl>
              <FormControl
                className="pe-3 pb-3"
                sx={{ width: "200px", color: orange[600] }}
              >
                <InputLabel id="demo-simple-select-label">Conductor</InputLabel>
                <Field name="conductor_">
                  {({ field, form }) => (
                    <Select
                      sx={{ borderRadius: 5, color: orange[600] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.conductor_}
                      label="Conductor"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "conductor_",
                          event.target.value,
                          true
                        )
                      }
                      error={
                        formik.touched.conductor_ &&
                        Boolean(formik.errors.conductor_)
                      }
                    >
                      <MenuItem value={"Conductor 1"}>Conductor 1</MenuItem>
                      <MenuItem value={"Conductor 2"}>Conductor 2</MenuItem>
                      <MenuItem value={"Conductor 3"}>Conductor 3</MenuItem>
                    </Select>
                  )}
                </Field>
                {formik.touched.conductor_ && formik.errors.conductor_ && (
                  <Typography color="error">
                    {formik.errors.conductor_}
                  </Typography>
                )}
              </FormControl>
              <FormControl
                className="pe-3 pb-3"
                sx={{ width: "200px", color: orange[600] }}
              >
                <InputLabel id="demo-simple-select-label">Bus</InputLabel>
                <Field name="bus_">
                  {({ field, form }) => (
                    <Select
                      sx={{ borderRadius: 5, color: orange[600] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.bus_}
                      label="Bus"
                      onChange={(event) =>
                        formik.setFieldValue("bus_", event.target.value, true)
                      }
                      error={formik.touched.bus_ && Boolean(formik.errors.bus_)}
                    >
                      <MenuItem value={"Bus 1"}>Bus 1</MenuItem>
                      <MenuItem value={"Bus 2"}>Bus 2</MenuItem>
                      <MenuItem value={"Bus 3"}>Bus 3</MenuItem>
                    </Select>
                  )}
                </Field>
                {formik.touched.bus_ && formik.errors.bus_ && (
                  <Typography color="error">{formik.errors.bus_}</Typography>
                )}
              </FormControl>
              <FormControl
                className="pe-3 pb-3"
                sx={{ width: "200px", color: orange[600] }}
              >
                <InputLabel id="demo-simple-select-label">Route</InputLabel>
                <Field name="route_">
                  {({ field, form }) => (
                    <Select
                      sx={{ borderRadius: 5, color: orange[600] }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.route_}
                      label="Route"
                      onChange={(event) =>
                        formik.setFieldValue("route_", event.target.value, true)
                      }
                      error={
                        formik.touched.route_ && Boolean(formik.errors.route_)
                      }
                    >
                      <MenuItem value={"Route 1"}>Route 1</MenuItem>
                      <MenuItem value={"Route 2"}>Route 2</MenuItem>
                      <MenuItem value={"Route 3"}>Route 3</MenuItem>
                    </Select>
                  )}
                </Field>
                {formik.touched.route_ && formik.errors.route_ && (
                  <Typography color="error">{formik.errors.route_}</Typography>
                )}
              </FormControl>
            </Box>
          </div>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1 }}
              >
                Finish
              </Button>
              <Button
                onClick={() => handleBack(formik.values)}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </>
      ),
    },
  ];
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ Width: "80%" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Formik
                  initialValues={formValues}
                  validationSchema={
                    index === 1
                      ? validationSchemaStep2(value)
                      : step.validationSchema
                  }
                  onSubmit={(values) => handleNext(values)}
                >
                  {(formik) => <Form>{step.content(formik)}</Form>}
                </Formik>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you're finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
}
