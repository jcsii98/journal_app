import React, { useState, useEffect } from "react";
import MainDash from "./pages/MainDash";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";

function App() {
  const rememberMe = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!rememberMe);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Check for token in storage
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setIsLoggedIn(true);

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
          setUserDetails(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="app-wrapper border-radius-1 py-2 px-1 display-flex flex-column">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? (
          <MainDash />
        ) : (
          <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </>
  );
}

export default App;
