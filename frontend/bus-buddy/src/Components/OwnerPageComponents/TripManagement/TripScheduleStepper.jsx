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
import { TextField } from "@mui/material";

const textBoxTheme = createTheme({
  shape: {
    borderRadius: 12,
  },
});

const validationSchemaStep1 = Yup.object().shape({
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

const validationSchemaStep2 = Yup.object().shape({
  // Define validation for Step 2 if needed
});

const validationSchemaStep3 = Yup.object().shape({
  // Define validation for Step 3 if needed
});

export default function TripScheduleStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    startDate: null,
    endDate: null,
    // add other form values here as needed
  });

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
      // reset other form values here as needed
    });
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Step 1",
      validationSchema: validationSchemaStep1,
      content: (formik) => (
        <>
          <div className="d-flex flex-column input-and-label mt-1">
            <label className="form-label">Start Date*</label>
            <ThemeProvider theme={textBoxTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Field name="startDate">
                  {({ field, form }) => (
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={formik.values.startDate}
                      onChange={(value) =>
                        formik.setFieldValue("startDate", value, true)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error:
                            formik.touched.startDate &&
                            Boolean(formik.errors.startDate),
                          helperText:
                            formik.touched.startDate && formik.errors.startDate,
                        },
                      }}
                    />
                  )}
                </Field>
              </LocalizationProvider>
            </ThemeProvider>
          </div>
          <div className="d-flex flex-column input-and-label mt-1">
            <label className="form-label">Ending Date*</label>
            <ThemeProvider theme={textBoxTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Field name="endDate">
                  {({ field, form }) => (
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={formik.values.endDate}
                      onChange={(value) =>
                        formik.setFieldValue("endDate", value, true)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error:
                            formik.touched.endDate &&
                            Boolean(formik.errors.endDate),
                          helperText:
                            formik.touched.endDate && formik.errors.endDate,
                        },
                      }}
                    />
                  )}
                </Field>
              </LocalizationProvider>
            </ThemeProvider>
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
          <Typography>Step 2 content goes here</Typography>
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
                validationSchema={step.validationSchema}
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
