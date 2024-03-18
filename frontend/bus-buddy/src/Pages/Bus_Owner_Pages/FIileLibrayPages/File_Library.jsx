import React, { useState } from "react";
import Uploader from "../../../Components/Uploader/Uploader";
import CatergoryCard from "../../../Components/OwnerPageComponents/CatergoryCard/CatergoryCard";
import "./FileLibrary.css";

function File_Library() {
  return (
    <div className="d-flex flex-column align-items-center  justify-content-center">
      <div className="d-flex mt-4 file-library-Heading">File Library</div>
      <div className="justify-content-center align-items-center d-flex flex-wrap py-4">
        <CatergoryCard catorgory={"NIC"} />
        <CatergoryCard catorgory={"SERVICE AGREEMENT"} />
        <CatergoryCard catorgory={"ROUTE PERMIT"} />
        <CatergoryCard catorgory={"BUS DOCUMENT"} />
      </div>
      <div className="d-flex my-4 py-4 file-library-sub-Heading">
        Add File to the Library
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
  );
}

export default File_Library;
