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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { orange } from "@mui/material/colors";

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
  // Define validation for Step 3 if needed
});

export default function TripScheduleStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    startDate: null,
    endDate: null,
    startDate_: null,
    endDate_: null,
    // add other form values here as needed
  });

  const [value, setValue] = React.useState("a");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNext = (values) => {
    setFormValues(values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormValues({
      startDate: null,
      endDate: null,
      startDate_: null,
      endDate_: null,
      // reset other form values here as needed
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
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
          <Typography>Step 3 content goes here</Typography>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                sx={{ mt: 1, mr: 1 }}
              >
                Finish
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
            </div>
          </Box>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 400 }}>
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
  );
}
