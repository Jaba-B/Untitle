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

  const [imageInfo, setImageInfo] = useState("");

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;

    setImage(file);
    axios
      .post("-----api-----", { name: fileName })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => toast.error(err.message));
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
        <div className="Main-sides"></div>
      </main>

      {/* Footer */}

      <footer className="Footer">
        <p className="Footer-p">Define Coordinates</p>
        <form className="Form">
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
            placeholder="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <input
            className="Input"
            type="text"
            placeholder="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            className="Btn"
            type="submit"
            value="Send"
            onClick={(e) => {
              e.preventDefault();
              toast.success("Coordinates successfully sent");
              setLatitude("");
              setLongitude("");
              setLength("");
              setWidth("");
            }}
          />
        </form>
      </footer>
    </>
  );
}

export default App;
