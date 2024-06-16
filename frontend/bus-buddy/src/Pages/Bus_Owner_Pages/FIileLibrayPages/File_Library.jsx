import React, { useState, useEffect, useRef } from "react";
import Uploader from "../../../Components/Uploader/Uploader";
import CatergoryCard from "../../../Components/OwnerPageComponents/CatergoryCard/CatergoryCard";
import "./FileLibrary.css";
import Button from "@mui/material-next/Button";
import axios from "axios";
import Swal from "sweetalert2";

function File_Library() {
  const token = localStorage.getItem("token");
  const [docName, setDocName] = useState("");
  const childRef = useRef();
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const nwfile = e;
    setFile(nwfile);
    setRefresh(!refresh);
  };
  const AddFile = () => {
    if (docName === "" || file === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Document Name and File is Required ",
      });
    } else {
      const form = new FormData();
      form.append("file", file);

      axios
        .post(
          `http://localhost:8081/api/v1/document/add?category=DOC_CATEGORY_UNSPECIFIED&name=${docName}`,
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
          childRef.current?.resetform();
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
      <div className="d-flex flex-column justify-content-center  align-items-center">
        <div className="input-and-label">
          <label className="form-label">
            Document Name<span style={{ color: "red" }}>*</span>
          </label>
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

        <Uploader ref={childRef} handleFileChange={handleFileChange} />
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
