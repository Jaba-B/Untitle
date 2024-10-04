import "./App.css";
import { useState } from "react";
import Home from "./Home";
import Leaf from "./Leaf";
import Pest from "./Pest";

function App() {
  const [navigation, setNavigation] = useState("home");

  return (
    <>
      <header className="Header">
        <p div="Logo">
          <img src="/logo.png" alt="logo" width={400} height={80} />
        </p>
        <ul className="Ul">
          <p
            className={navigation === "home" ? "Active-anchor" : "Anchor"}
            onClick={(e) => {
              e.preventDefault();
              setNavigation("home");
            }}
          >
            Home
          </p>
          <p
            className={navigation === "leaf" ? "Active-anchor" : "Anchor"}
            onClick={(e) => {
              e.preventDefault();
              setNavigation("leaf");
            }}
          >
            Leaf
          </p>
          <p
            className={navigation === "pest" ? "Active-anchor" : "Anchor"}
            onClick={(e) => {
              e.preventDefault();
              setNavigation("pest");
            }}
          >
            Pest
          </p>
        </ul>
      </header>
      <main>
        {navigation === "home" && <Home />}
        {navigation === "leaf" && <Leaf />}
        {navigation === "pest" && <Pest />}
      </main>
      <footer className="Footer"></footer>
    </>
  );
}

export default App;
