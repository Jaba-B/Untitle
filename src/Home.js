import "./App.css";
import { useState } from "react";
import toast from "react-hot-toast";

function Home() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [rowWidth, setRowWidth] = useState("");
  const [rowLength, setRowLength] = useState("");

  return (
    <div className="Home">
      <p className="Home-p">Define area</p>
      <form
        className="Home-form"
        onSubmit={(e) => {
          e.preventDefault();
          setLatitude("");
          setLongitude("");
          setRowWidth("");
          setRowLength("");
          setLength("");
          setWidth("");
          toast.success("Coordinates sent successfully");
        }}
      >
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
          placeholder="Row Width"
          value={rowWidth}
          onChange={(e) => setRowWidth(e.target.value)}
        />
        <input
          className="Input"
          type="text"
          placeholder="Row Length"
          value={rowLength}
          onChange={(e) => setRowLength(e.target.value)}
        />
        <input
          className="Input"
          type="text"
          placeholder="Area Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          className="Input"
          type="text"
          placeholder="Area Length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <button className="Btn" type="submit">
          Generate path
        </button>
      </form>
    </div>
  );
}

export default Home;
