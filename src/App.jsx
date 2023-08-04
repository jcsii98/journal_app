import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainDash from "./pages/MainDash";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userSession = async () => {
    const accessToken = localStorage.getItem("access-token");
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");

    // Check if all the required tokens are present
    const loggedIn = !!accessToken && !!uid && !!client;

    if (loggedIn) {
      try {
        // Send a request to the backend to validate the tokens
        const response = await fetch("http://127.0.0.1:3000/validate_token", {
          method: "GET",
          headers: {
            "access-token": accessToken,
            uid: uid,
            client: client,
          },
        });

        // Assuming your backend returns a JSON response with a "valid" property
        const data = await response.json();
        console.log(data);
        const isValidTokens = data.valid;

        // Set the isLoggedIn state based on token validation status
        setIsLoggedIn(isValidTokens);
      } catch (error) {
        // If there's an error during token validation, assume the tokens are not valid
        setIsLoggedIn(false);
      }
    } else {
      // If any of the required tokens are missing, the user is not logged in
      setIsLoggedIn(false);
    }
  };

  // Call userSession when the component mounts to check the session status
  useEffect(() => {
    userSession();
  }, []);
  return (
    <>
      <div className="outer-wrapper">
        {" "}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="app-wrapper border-radius-1 py-4 px-4 display-flex flex-column">
          {isLoggedIn ? (
            <MainDash />
          ) : (
            <LoginPage
              userSession={userSession}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
