import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import Button from "@mui/material-next/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const validationSchema = yup.object({
  firstDate: yup.date().required("First Date is required"),
  lastDate: yup.date().required("Last Date is required"),
});

const buttonStyle = {
  borderRadius: 10,
  margin: 30,
  backgroundColor: "#ff760d",
  color: "white",
};

const text_box_the = createTheme({
  shape: {
    borderRadius: 12,
  },
});

function TripScheduleStepper() {
  return (
    <div
      className="justify-content-center align-items-center d-flex "
      style={{ width: "100%" }}
    >
      <Formik
        initialValues={{
          income: null,
          startTime: null,
          endTime: null,
          busId: null,
          driverId: null,
          condocterId: null,
          expense: null,
          firstDate: null,
          lastDate: null,
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex-column justify-content-center align-items-center d-flex "
            style={{ width: "100%" }}
          >
            {/* <div className="input-and-label">
              <label className="form-label" htmlFor="income">
                Income*
              </label>
              <input
                type="number"
                id="income"
                name="income"
                className="form-control input-field-trip"
                value={formik.values.income}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.income && formik.errors.income ? (
                <div className="text-danger">{formik.errors.income}</div>
              ) : null}
            </div> */}

            <div className="d-flex flex-column input-and-label">
              <label class="form-label">First Date*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    sx={{ width: 200 }}
                    value={formik.values.firstDate}
                    name="firstDate"
                    format="DD/MM/YYYY"
                    onChange={(value) =>
                      formik.setFieldValue("firstDate", value, true)
                    }
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error:
                          formik.touched.firstDate &&
                          Boolean(formik.errors.firstDate),
                        helperText:
                          formik.touched.firstDate && formik.errors.firstDate,
                      },
                    }}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>

            <div className="d-flex flex-column input-and-label">
              <label class="form-label">Last Date*</label>
              <ThemeProvider theme={text_box_the}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    sx={{ width: 200 }}
                    value={formik.values.lastDate}
                    name="lastDate"
                    format="DD/MM/YYYY"
                    onChange={(value) =>
                      formik.setFieldValue("lastDate", value, true)
                    }
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error:
                          formik.touched.lastDate &&
                          Boolean(formik.errors.lastDate),
                        helperText:
                          formik.touched.lastDate && formik.errors.lastDate,
                      },
                    }}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>

            <Button
              style={buttonStyle}
              className="d-flex update-btn"
              variant="contained"
              type="submit"
            >
              ADD TRIP
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TripScheduleStepper;
