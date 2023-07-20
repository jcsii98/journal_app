import React, { useState, useEffect } from "react";
import MainDash from "./pages/MainDash";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const rememberMe = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!rememberMe);
  const [userDetails, setUserDetails] = useState({});

  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      const url = `http://localhost:3000/user/${storedUserId}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            setUserDetails(data);
            setIsTokenValid(true);
          } else {
            setIsTokenValid(false);
            localStorage.clear();
          }
        })
        .catch((error) => {
          setIsTokenValid(false);
          localStorage.clear();
          console.error(error);
        });
    } else {
      setIsTokenValid(false);
      localStorage.clear();
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []); // Empty dependency array to call the function once on initial render

  return (
    <>
      <div className="outer-wrapper">
        <Header
          setIsTokenValid={setIsTokenValid}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="app-wrapper border-radius-1 py-4 px-4 display-flex flex-column">
          {isTokenValid ? (
            <MainDash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginPage
              setIsTokenValid={setIsTokenValid}
              isTokenValid={isTokenValid}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
