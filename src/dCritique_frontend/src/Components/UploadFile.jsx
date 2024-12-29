import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
import uf from "../Styles/UploadFile.module.css";

const UploadFile = () => {
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

  //   function processBackendData(data) {
  //      Assuming data is an array
  //     data.forEach((item, index) => {
  //        Access the data and use it as needed
  //       const itemId = item[0];
  //       const itemProperties = item[1];

  //        You can now use itemId and itemProperties to update your frontend UI
  //        For example, update input fields, create HTML elements, etc.
  //        Below is just a simple example of logging to the console
  //       console.log(
  //     `Item ${index + 1} - ID: ${itemId}, Properties:`,
  //     itemProperties
  //    );
  //     });
  //   }

  const fetch = async () => {
    const res = await dCritique_backend.getReview();
    // console.log("fetch Called")
    setRec(res);
  };

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    console.log("rec called");
    console.log(rec);

    // processBackendData(rec.data);
  });

  // Assume you have an API endpoint on the backend that returns the data

  // Fetch data from the backend

  // Function to process the data on the frontend

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

  // const handleUpload = async() => {
  //   // if (file) {
  //   //   // let idCardBase64 = "";
  //   //   // getBase64(file, (result) => {
  //   //   //   idCardBase64 = result;
  //   //   // });
  //   // }
  //   await dCritique_backend.addReview("hello", 9, data)
  //   window.location.reload()
  // };

  // function handleSaveFile(idCardBase64) {
  //   try {
  //     let response = dCritique_backend.saveFile(uuidv4(), idCardBase64, "", 19);
  //     if (response) {
  //       alert("Upload Successfully");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
  const img = 
    rec.map((a) => (
      <>
      <b>{a.review}</b>
      <b>{a.stars}</b>
      <img src={a.images} alt="img" />
      </>
    ));

  const addReview = async()=>{
    // if (file) {
    //   let idCardBase64 = "";
    //   getBase64(file, (result) => {
    //     idCardBase64 = result;
    //   });
    // }
  //  console.log("data" + data) ;
    await dCritique_backend.addReview("",5,data)
    window.location.reload()
  }
  return (
    <div className={uf.container}>
      <div className={uf.content}>m
        <h1>Welcome to Your Dashboard</h1>
        <div className="upload-section">
          <input
            type="file"
            // accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
          <button onClick={addReview}>Upload</button>
          
        </div>
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h2>Uploaded Files:</h2>
            <ul>
              {/* {uploadedFiles.map((uploadedFile, index) => (
                <li key={index}>{uploadedFile.name}</li>
              ))} */}
            </ul>
          </div>
        )}
           {img}
          {/* <img src={data} alt="Description" /> */}
        
      </div>
    </div>
  );
};

export { UploadFile };

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { dCritique_backend } from "../../../declarations/dCritique_backend/index";
// import uf from "../Styles/UploadFile.module.css";

// const UploadFile = () => {
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     let idCardBase64 = "";
//     getBase64(selectedFile, (result) => {
//       idCardBase64 = result;
//       console.log("idCardBase64", idCardBase64);
//       handleSaveFile(idCardBase64);
//       setData(idCardBase64);
//     });
//   };

//   function getBase64(file, cb) {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     console.log("reader", reader);
//     reader.onload = function () {
//       cb(reader.result);
//     };
//     reader.onerror = function (error) {
//       console.log("Error: ", error);
//     };
//   }

//   const handleUpload = () => {
//     if (file) {
//       let idCardBase64 = "";
//       getBase64(file, (result) => {
//         idCardBase64 = result;
//       });
//     }
//   };

//   function handleSaveFile(idCardBase64) {
//     try {
//       let response = dCritique_backend.saveFile(uuidv4(), idCardBase64);
//       if (response) {
//         alert("Upload Successfully");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         <h1>Welcome to Your Dashboard</h1>
//         <div className="upload-section">
//           <input
//             type="file"

//             onChange={handleFileChange}
//           />
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//         {uploadedFiles.length > 0 && (
//           <div className={uf.uploaded_files}>
//             <h2>Uploaded Files:</h2>
//             <ul>
//               {uploadedFiles.map((uploadedFile, index) => (
//                 <li key={index}>{uploadedFile.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <img src={data} />
//       </div>
//     </div>
//   );
// };

// export { UploadFile };
