import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { IoIosArrowBack } from "react-icons/io";
function ServiceAgreementPage() {
  const token = localStorage.getItem("token");
  const [searchInput, setSearchInput] = useState("");
  const [refresh, setRefresh] = useState(true);

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

  const handleSearchInputChange = async (event) => {
    setSearchInput(event.target.value);
  };

  const columns = [
    { field: "id", flex: 1, headerName: "Document ID", minWidth: 130 },
    {
      field: "docName",
      flex: 1,
      headerName: "Document Name",
      minWidthwidth: 130,
    },
    {
      field: "uploadDate",
      flex: 1,
      headerName: "Uploaded Date",
      minWidth: 130,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleEdit(params.row)}
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

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  return (
    <div>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <div
          style={{ width: "80%", color: "grey" }}
          className="my-4 text-start"
        >
          <h2>Service Agreement Document Library</h2>
        </div>
        <div
          style={{ width: "80%" }}
          class="d-flex flex-wrap-reverse align-items-center  justify-content-between my-3"
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
                  width: 300,
                  borderRadius: 10,
                  borderColor: "FF760D",
                },
              }}
            />
          </ThemeProvider>
          <div className="d-flex  py-3">
            <Button
              href="/filelibrary"
              className="mx-2"
              size="large"
              variant="text"
              startIcon={<IoIosArrowBack color="black" />}
              style={{ borderRadius: 10, color: "black" }}
            >
              Back
            </Button>
          </div>
        </div>

        <div
          className="justify-content-center align-items-center mt-2"
          style={{ width: "80%", height: 600 }}
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
              pageSizeOptions={[10, 20]}
              rowHeight={40}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default ServiceAgreementPage;
