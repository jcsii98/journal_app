import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainDash from "./pages/MainDash";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="outer-wrapper">
        {" "}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="app-wrapper border-radius-1 py-4 px-4 display-flex flex-column">
          {isLoggedIn ? (
            <MainDash />
          ) : (
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
