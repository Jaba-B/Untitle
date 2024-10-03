// import "./App.css";
// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// function App() {
//   const [image, setImage] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [length, setLength] = useState("");
//   const [width, setWidth] = useState("");
//   const [data, setData] = useState(null);

//   const [imageInfo, setImageInfo] = useState("");

//   const handleImgChange = (e) => {
//     const file = e.target.files[0];
//     const fileName = file.name;

//     setImage(file);
//     axios
//       .post("-----api-----", { name: fileName })
//       .then((response) => {
//         console.log("response", response);
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   // predicted_class
//   // predicted_probability
//   // row width
//   // row lenght

//   // send -> generate path

//   // leaf health accessor
//   // pest identificator

//   return (
//     <>
//       {/* Header */}

//       <header className="Header">
//         <p div="Logo">
//           <img src="/logo.png" alt="logo" width={400} height={80} />
//         </p>
//       </header>

//       {/* Main */}

//       <main className="Main">
//         <div className="Main-sides Main-leftside">
//           <label className="Btn Btn-upload">
//             <input type="file" onChange={handleImgChange} />
//             Upload
//           </label>
//           {image ? (
//             <div className="Img-container">
//               <img className="Image" src={URL.createObjectURL(image)} alt="" />
//             </div>
//           ) : null}
//         </div>
//         <div className="Divider"></div>
//         <div className="Main-sides Main-rightside">
//           <div className="Info-container">
//             <p className="Label-typography"></p>
//             <p className="Label-typography"></p>
//           </div>
//           <div className="Info-container">
//             <p className="Label-typography"></p>
//             <p className="Label-typography"></p>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}

//       <footer className="Footer">
//         <p className="Footer-p">Define Coordinates</p>
//         <form className="Form">
//           <input
//             className="Input"
//             type="text"
//             placeholder="Latitude"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//           />
//           <input
//             className="Input"
//             type="text"
//             placeholder="Longitude"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//           />
//           <input
//             className="Input"
//             type="text"
//             placeholder="Length"
//             value={length}
//             onChange={(e) => setLength(e.target.value)}
//           />
//           <input
//             className="Input"
//             type="text"
//             placeholder="Width"
//             value={width}
//             onChange={(e) => setWidth(e.target.value)}
//           />
//           <input
//             className="Btn"
//             type="submit"
//             value="Send"
//             onClick={(e) => {
//               e.preventDefault();
//               toast.success("Coordinates successfully sent");
//               setLatitude("");
//               setLongitude("");
//               setLength("");
//               setWidth("");
//             }}
//           />
//         </form>
//       </footer>
//     </>
//   );
// }

// export default App;

import "./App.css";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function App() {
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [data, setData] = useState(null);

  const [imageInfo, setImageInfo] = useState("");

  // Function to handle image upload
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageInfo(file.name);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image); // Append image file
    formData.append("model", "l"); // You can customize the model parameter here
    // formData.append("latitude", latitude);
    // formData.append("longitude", longitude);
    // formData.append("length", length);
    // formData.append("width", width);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      setData(response.data);
      toast.success("File successfully uploaded and data received!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }

    // Clear form fields
    setLatitude("");
    setLongitude("");
    setLength("");
    setWidth("");
    setImage("");
  };

  return (
    <>
      {/* Header */}
      <header className="Header">
        <p div="Logo">
          <img src="/logo.png" alt="logo" width={400} height={80} />
        </p>
      </header>

      {/* Main */}
      <main className="Main">
        <div className="Main-sides Main-leftside">
          <label className="Btn Btn-upload">
            <input type="file" onChange={handleImgChange} />
            Upload
          </label>
          {image ? (
            <div className="Img-container">
              <img className="Image" src={URL.createObjectURL(image)} alt="" />
            </div>
          ) : null}
        </div>
        <div className="Divider"></div>
        <div className="Main-sides Main-rightside">
          <div className="Info-container">
            <p className="Label-typography">{data ? "Predict Class" : null}</p>
            <p className="Label-typography">
              {data ? data?.predict_class : null}
            </p>
          </div>
          <div className="Info-container">
            <p className="Label-typography">
              {data ? "Predict Probability" : null}{" "}
            </p>
            <p className="Label-typography">
              {data ? data?.predict_probability : null}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="Footer">
        <p className="Footer-p">Define Coordinates</p>
        <form className="Form" onSubmit={handleFormSubmit}>
          <input
            className="Input"
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            className="Input"
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <input
            className="Input"
            type="text"
            placeholder="Length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <input
            className="Input"
            type="text"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <button className="Btn" type="submit">
            Send
          </button>
        </form>
      </footer>
    </>
  );
}

export default App;
