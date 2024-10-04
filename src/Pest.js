import "./App.css";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Pest() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const handleImgChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("model", "l");

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
      setLoading(false);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="Main-header">Pest Identificator</h1>
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
          {loading ? (
            <h1 className="Loading">Loading...</h1>
          ) : (
            <>
              <div className="Info-container">
                <p className="Label-typography">
                  {data ? "Predicted Class" : null}
                </p>
                <p className="Label-typography">
                  {data?.class ? `${data?.predicted_class}` : null}
                </p>
              </div>
              <div className="Info-container">
                <p className="Label-typography">
                  {data ? "Predicted Probability" : null}{" "}
                  {data?.predicted_probability
                    ? `${data?.predicted_probability * 100} %`
                    : null}
                </p>
                <p className="Label-typography">
                  {data ? data?.predict_probability : null}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Pest;
