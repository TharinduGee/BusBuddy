import React, { useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import Uploader from "../../Components/Uploader/Uploader";

function File_Library() {
  const [rows_, setRows] = useState([]);
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
    { field: "id", headerName: "Document ID", width: 130 },
    { field: "docname", headerName: "Document Name", width: 130 },
    { field: "uploaddate", headerName: "Uploaded Date", width: 130 },
    {
      field: "url",
      headerName: "Document Url",
      width: 130,
    },
    {
      field: "doccategory",
      headerName: "Document Category",
      width: 130,
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
            // onClick={() => handleEdit(params.row.id)}
          >
            <EditNoteSharpIcon />
          </IconButton>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSearchInputChange = (event) => {};

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
              label="Search by Document Name"
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
                rows={rows_}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                // onRowClick={handleRowClick}
                pageSizeOptions={[5, 10]}
                rowHeight={40}
              />
            </ThemeProvider>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center  align-items-start">
          <div className="d-flex flex-column justify-content-center p-4 mx-4">
            <div className="input-and-label">
              <label class="form-label">Document Name*</label>
              <input
                type="text"
                id="Document_name"
                class="form-control input-field-trip mb-4"
              />
            </div>
            <div className="input-and-label">
              <label class="form-label">Document Catogory*</label>
              <select class="form-select input-field-trip mb-4">
                <option value="NORMAL">Cat1</option>
                <option value="SEMI_LUXURY">cat2</option>
                <option value="LUXURY">cat3</option>
              </select>
            </div>
          </div>
          <Uploader />
        </div>
      </div>
    </div>
  );
}

export default File_Library;
