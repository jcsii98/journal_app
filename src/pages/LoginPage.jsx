import React, { useState, useEffect } from "react";

export default function LoginPage(props) {
  const { setIsLoggedIn } = props;
  // state variables for loginPage
  const [showSignup, setShowSignup] = useState(false);

  // state variables for signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");

  // state variables for signin
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const API_URL = "https://journal-api-cxui.onrender.com/auth";

  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupPassword !== signupPasswordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const requestData = {
      email: signupEmail,
      password: signupPassword,
      password_confirmation: signupPasswordConfirm,
    };

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });

    await handleAuthResponse(response);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/sign_in`, {
      method: "POST",
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    await handleAuthResponse(response);
  };

  const handleSignupToggle = (event) => {
    event.preventDefault();
    setShowSignup((prevState) => !prevState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (showSignup) {
      handleSignup(event);
    } else {
      handleSignin(event);
    }
  };

  const handleAuthResponse = async (response) => {
    if (response.ok) {
      const responseData = await response.json();

      // Check for the presence of the required fields in the response data
      if (
        responseData.data &&
        responseData.data.email &&
        responseData.data.uid
      ) {
        // Store tokens in localStorage
        localStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        localStorage.setItem("uid", response.headers.get("uid"));
        localStorage.setItem("client", response.headers.get("client"));

        // Set isLoggedIn to true only when the response is successful
        setIsLoggedIn(true);
      } else {
        // Handle the case when the response data does not contain the required fields
        console.error("Authentication Error: Invalid response data");
      }
    } else {
      // Handle the error response, show error messages, etc.
      console.error("Authentication Error:", response.status);
    }
  };

  const userSession = () => {
    const accessToken = localStorage.getItem("access-token");
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");

    // Check if all the required tokens are present
    const loggedIn = !!accessToken && !!uid && !!client;

    // Set the isLoggedIn state based on the user session status
    setIsLoggedIn(loggedIn);
  };
  // Call userSession when the component mounts to check the session status
  useEffect(() => {
    userSession();
  }, []);
  return (
    <>
      <div className="form-container mb-1">
        <div className="mb-3">
          <h2 className="font-color-primary">
            {showSignup ? <>Signup</> : <>Log in</>}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="font-color-primary">
          <div className="mb-3">
            {showSignup ? (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="form-control"
                    placeholder="sample@email.com"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password-confirmation">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={signupPasswordConfirm}
                    onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                    className="form-control"
                    placeholder="Password confirmation"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group mb-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={signinEmail}
                    onChange={(e) => setSigninEmail(e.target.value)}
                    className="form-control"
                    placeholder="sample@email.com"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </>
            )}
          </div>

          <div className="button-container">
            {" "}
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
            <p className="text-muted">
              <button
                type="button"
                onClick={handleSignupToggle}
                className="mx-3 btn btn-link"
              >
                {" "}
                {showSignup ? (
                  <>Already have an account? Login here</>
                ) : (
                  <>Don't have an account? Sign up here</>
                )}
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
