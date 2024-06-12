import React, { useState, useEffect, useCallback } from "react";
import Uploader from "../../../Components/Uploader/Uploader";
import CatergoryCard from "../../../Components/OwnerPageComponents/CatergoryCard/CatergoryCard";
import "./FileLibrary.css";
import Button from "@mui/material-next/Button";
import axios from "axios";
import Swal from "sweetalert2";

function File_Library() {
  const token = localStorage.getItem("token");
  const [doctype, setdoctype] = useState("");
  const [docID, setdocID] = useState("");
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const nwfile = e;
    setFile(nwfile);
    setRefresh(!refresh);
  };
  const AddFile = () => {
    if (doctype === null || docName === "" || docID === "" || file === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields should be filled!",
      });
    } else {
      const form = new FormData();
      form.append("file", file);

      axios
        .post(
          `http://localhost:8081/api/v1/document/add?category=${doctype}&name=${docName}&id=${docID}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data; boundary=---011000010111000001101001",
            },
            data: "[form]",
          }
        )
        .then(function (response) {
          Swal.fire({
            title: "Good job!",
            text: "File Added Successfully!",
            icon: "success",
          });
          console.log("Data successfully posted:", response.data);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.error("Error posting data:", error);
        });
      clear();
    }
  };

  const clear = () => {
    setdocID("");
    setdoctype("");
    setDocName("");
  };

  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    console.log("sdsad  " + file);
  }, [refresh]);
  return (
    <div className="d-flex flex-column align-items-center  justify-content-center">
      <h1>File Library </h1>
      <div className="justify-content-center align-items-center d-flex flex-wrap py-4">
        <CatergoryCard catorgory={"SERVICE AGREEMENT"} />
        <CatergoryCard catorgory={"ROUTE PERMIT"} />
        <CatergoryCard catorgory={"BUS DOCUMENT"} />
        <CatergoryCard catorgory={"OTHER"} />
      </div>
      <div className="d-flex my-4 py-4 file-library-sub-Heading">
        Add File to the Library
      </div>
      <div className="d-flex flex-wrap justify-content-center  align-items-center">
        <div className="d-flex flex-column justify-content-center  px-2 mx-4">
          <div className="input-and-label">
            <label className="form-label">Document Name*</label>
            <input
              type="text"
              id="Document_name"
              className="form-control input-field-trip mb-4"
              value={docName}
              onChange={(newValue) => {
                const selectedValue = newValue.target.value;
                setDocName(selectedValue);
                console.log("doc name", selectedValue);
              }}
            />
          </div>
          <div className="input-and-label">
            <label className="form-label">Document Catogory*</label>
            <select
              className="form-select input-field-trip mb-4"
              onChange={(newValue) => {
                const selectedValue = newValue.target.value;
                setdoctype(selectedValue);
                console.log("one change date", selectedValue);
              }}
              value={doctype}
            >
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
            <label className="form-label">Document Related ID*</label>
            <input
              type="text"
              id="Document_id"
              className="form-control input-field-trip mb-4"
              onChange={(newValue) => {
                const selectedValue = newValue.target.value;
                setdocID(selectedValue);
                console.log("doc id", selectedValue);
              }}
              value={docID}
              onKeyPress={(event) => {
                const char = String.fromCharCode(event.charCode);
                if (!/^\d|\.$|^[-]/.test(char)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <Uploader handleFileChange={handleFileChange} />
      </div>

      <Button
        style={{
          borderRadius: 10,
          margin: 30,
          backgroundColor: "#ff760d",
          color: "white",
          width: "250px",
        }}
        className="d-flex  update-btn"
        variant="contained"
        onClick={AddFile}
      >
        Submit
      </Button>
    </div>
  );
}

export default File_Library;
