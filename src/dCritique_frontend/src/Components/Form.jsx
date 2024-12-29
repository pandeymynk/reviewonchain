import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
import f from "../Styles/Form.module.css";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "./Loader.jsx";

const colors = {
  orange: "#ffff00",
  grey: "#FEFDEC",
};

function Form() {
  const [loader, setLoader] = useState();
  const nav = useNavigate();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [rec, setRec] = useState([]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    let idCardBase64 = "";
    getBase64(selectedFile, (result) => {
      idCardBase64 = result;
      console.log("idCardBase64", idCardBase64);
      // handleSaveFile(idCardBase64);
      setData(idCardBase64);
    });
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader", reader);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const onSubmit = async () => {
    let a = document.getElementById("review");
    // let b = document.getElementById("")
    setLoader(<Loader />);
    await dCritique_backend.addReview(a.value, currentValue, data);
    window.location.reload();
    nav("/");
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <>
      <div className={f.header}>
        {loader}
        <div className={f.stars}>
          {stars.map((_, index) => {
            return (
              <IoStarSharp
                key={index}
                size={48}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                className={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        
        <div className={f.buttons}>
          <button className={f.Btn} onClick={onSubmit}>
            Upload a Photo
          </button>
          <input
            type="file"
            // accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
        </div>

        <div className={f.inputContainer}>
          <textarea
            id="review"
            style={{ whiteSpace: "pre-line" }}
            className={f.input}
            placeholder="Share your Review..."
          ></textarea>
        </div>
      </div>
      <div className={f.buttons}>
        <button onClick={onSubmit} className={f.Btn}>
          Submit
        </button>
      </div>
    </>
  );
}

export { Form };
