import React, { useState } from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import PdfLogo from "../../Assets/pdflogo.png";
import { forwardRef, useImperativeHandle } from "react";

const Uploader = forwardRef(({ handleFileChange }, ref) => {
  const [doc, setDoc] = useState(null);
  const [docName, setDocName] = useState("No Document Selected");
  const [type, setType] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files[0]) {
      setDocName(files[0].name);
      setDoc(URL.createObjectURL(files[0]));
      setType(files[0].type);
      handleFileChange(files[0]);
      // console.log(type);
    }
    setIsDraggingOver(false);
  };

  const resetform = () => {
    setDocName("No Selected File");
    setDoc(null);
  };

  useImperativeHandle(ref, () => ({
    resetform,
  }));

  return (
    <div>
      <form
        className={`${isDraggingOver ? "form-upload-on" : "form-upload"}`}
        onClick={() => document.querySelector(".input-field").click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          name=""
          id=""
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setDocName(files[0].name);
            if (files) {
              setDoc(URL.createObjectURL(files[0]));
              setType(files[0].type);
              handleFileChange(files[0]);
            }
          }}
        />
        {doc ? (
          type == "application/pdf" ? (
            <img src={PdfLogo} alt="PDF Logo" width="auto" height="100%" />
          ) : (
            <img src={doc} alt="Uploaded File" width="auto" height="80%" />
          )
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to Upload</p>
          </>
        )}
      </form>
      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf" />
        <span className="d-flex justify-content-center align-items-center">
          {docName}
          <MdDelete
            size={20}
            className="delete-doc"
            onClick={() => {
              resetform();
            }}
          />
        </span>
      </section>
    </div>
  );
});

export default Uploader;
