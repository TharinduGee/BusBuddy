import React, { useState } from "react";
import Sidebar from "../../../Components/OwnerPageComponents/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import Uploader from "../../../Components/Uploader/Uploader";
import CatergoryCard from "../../../Components/OwnerPageComponents/CatergoryCard/CatergoryCard";

function File_Library() {
  return (
    <div>
      <div className="d-flex flex-column align-items-center  justify-content-end">
        <div
          className="justify-content-center align-items-center d-flex py-4"
          style={{ height: 400, width: "100%" }}
        >
          <CatergoryCard catorgory={"Name"} />
          <CatergoryCard catorgory={"Name"} />
          <CatergoryCard catorgory={"Name"} />
          <CatergoryCard catorgory={"Name"} />
        </div>

        <div className="d-flex flex-wrap justify-content-center  align-items-center">
          <div className="d-flex flex-column justify-content-center  px-2 mx-4">
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
                <option value="DOC_CATEGORY_NIC">NIC</option>
                <option value="DOC_CATEGORY_SERVICE_AGREEMENT">
                  SERVICE AGREEMENT
                </option>
                <option value="DOC_CATEGORY_ROUTE_PERMIT">ROUTE PERMIT</option>
                <option value="DOC_CATEGORY_BUS_DOC">BUS DOC</option>
                <option value="DOC_CATEGORY_UNSPECIFIED">UNSPECIFIED</option>
              </select>
            </div>
            <div className="input-and-label">
              <label class="form-label">Document ID*</label>
              <input
                type="text"
                id="Document_id"
                class="form-control input-field-trip mb-4"
              />
            </div>
          </div>
          <Uploader />
        </div>
      </div>
    </div>
  );
}

export default File_Library;
